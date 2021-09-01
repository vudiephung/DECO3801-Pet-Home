import { Router } from 'express';
import * as fs from 'fs/promises';
import multer from 'multer';
import User from '../models/User';
import Pet from '../models/Pet';
import verifyAccess from '../middleware/authMiddleware';
import * as S3 from '../utilities/s3';

const router = Router();
const upload = multer({ dest: './pet-image-uploads/' });

router.post('/shelter-add-pet', upload.single('picture'), verifyAccess, async (req, res, next) => {
  try {
    // Upload the image to S3 then delete local image
    const { Key: imageKey } = await S3.uploadImage(req.file);
    await fs.unlink(req.file!.path);

    // Create the new Pet document
    const { name, type, breed, age, description } = req.body;
    const pet = await Pet.create({
      name: name,
      type: type,
      breed: breed,
      age: age,
      pictures: [imageKey],
      description: description,
    });

    // Add Pet's ID to list in shelter User document
    const shelterUser = await User.findById((req as any).userId).exec();
    shelterUser.ownedPets.push(pet._id);
    await shelterUser.save();

    res.status(201).json({ success: (pet as any).pictures });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.put('/shelter-edit-pet', verifyAccess, (req, res, next) => {});

router.delete('/shelter-delete-pet', verifyAccess, (req, res, next) => {});

export default router;
