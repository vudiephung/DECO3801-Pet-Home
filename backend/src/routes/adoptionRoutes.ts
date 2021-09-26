import { Router } from 'express';
import { promises as fs } from 'fs';
import multer from 'multer';

import User from '../models/User';
import Pet from '../models/Pet';
import verifyAccess from '../middleware/authMiddleware';
import * as S3 from '../utilities/s3';

const router = Router();
const upload = multer({ dest: './pet-image-uploads/' });

router.get('/image/:key', verifyAccess, (req, res) => {
  const imageKey = req.params.key;
  const imageStream = S3.fetchImage(imageKey);
  imageStream.pipe(res);
});

// retrieve all available pets data for every users
router.get('/all-pets', verifyAccess, async (req, res) => {
  try {
    const pet = await Pet.find().exec();
    res.status(200).json(pet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// retrieve pets data based on types dogs/cats
router.get('/filtered-pets/:type', verifyAccess, async (req, res) => {
  try {
    const checkType = req.params.type;
    if (checkType === 'dog') {
      const dogPet = await Pet.find({ type: 'dog' }).exec();
      res.status(200).json(dogPet);
    }
    if (checkType === 'cat') {
      const catPet = await Pet.find({ type: 'cat' }).exec();
      res.status(200).json(catPet);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// retrieve every user'favorite pets
router.get('/user-favorite-pets', verifyAccess, async (req, res) => {
  try {
    const user = await User.findById((req as any).userId).exec();
    const favPets = await Pet.find({ _id: { $in: user.favoritePets } });
    res.status(200).json(favPets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/user-add-favorite/:petId', verifyAccess, async (req, res) => {
  const { petId } = req.params;
  try {
    const user = await User.findById((req as any).userId).exec();
    user.favoritePets.push(petId);
    await user.save();
    res.status(200).json({ success: "Added pet to user's favorite" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/user-delete-favorite/:petId', verifyAccess, async (req, res) => {
  const { petId } = req.params;
  try {
    const user = await User.findById((req as any).userId).exec();
    const petIndex = user.favoritePets.indexOf(petId);
    user.favoritePets.splice(petIndex, 1);
    await user.save();
    res.status(200).json({ success: "Removed pet from user's favorite" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ============================= Routes for Shelter user =============================

// retrieve petIds owned by a single Shelter
router.get('/shelter-owned-pets', verifyAccess, async (req, res) => {
  try {
    const shelterUser = await User.findById((req as any).userId).exec();
    const resultPet = await Pet.find({ _id: { $in: shelterUser.ownedPets } });

    res.status(200).json(resultPet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.delete('/shelter-delete-pet/:petId', verifyAccess, async (req, res) => {
  const { petId } = req.params;
  try {
    // Find shelter user doc and remove petId from ownedPets
    const shelterUser = await User.findById((req as any).userId).exec();
    const petIndex = shelterUser.ownedPets.indexOf(petId);
    shelterUser.ownedPets.splice(petIndex, 1);
    shelterUser.save(); // await
    // Find pet doc and delete its images from remote S3 bucket
    const pet = await Pet.findById(petId).exec();
    for (let i = 0; i < pet.images.length; i++) {
      S3.deleteImage(pet.images[i]); // await
    }
    // Delete the pet doc from db
    Pet.findByIdAndDelete(petId).exec(); // await
    res.status(200).json({ success: 'Pet successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/shelter-add-pet', upload.array('image', 3), verifyAccess, async (req, res) => {
  try {
    // Upload the image(s) to S3 then delete local image(s)
    const imageKeys: string[] = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const { Key } = await S3.uploadImage((req.files as Express.Multer.File[])[i]);
        imageKeys.push(Key);
        fs.unlink((req.files as Express.Multer.File[])[i].path); // await
      }
    }
    // Create the new Pet document
    const { name, type, breed, age, description } = req.body;
    const pet = await Pet.create({
      name,
      type,
      breed,
      age,
      images: imageKeys,
      description,
    });
    // Add Pet's ID to list in shelter User document
    const shelterUser = await User.findById((req as any).userId).exec();
    shelterUser.ownedPets.push(pet._id);
    shelterUser.save(); // await
    res.status(201).json({ petId: pet._id, images: (pet as any).images });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.put('/shelter-edit-pet/:petId', upload.array('image', 3), verifyAccess, async (req, res) => {
  const { petId } = req.params;
  const { name, type, breed, age, description, imagesToDelete } = req.body;
  try {
    // Find the pet document and update its name, type, breed, age, description
    const pet = await Pet.findById(petId).exec();
    pet.name = name;
    pet.type = type;
    pet.breed = breed;
    pet.age = age;
    pet.description = description;
    // Remove to-be-deleted image keys from the pet doc and the remote S3 bucket
    if (imagesToDelete) {
      for (let i = 0; i < imagesToDelete.length; i++) {
        const imageIndex = pet.images.indexOf(imagesToDelete[i]);
        pet.images.splice(imageIndex, 1);
        S3.deleteImage(imagesToDelete[i]); // await
      }
    }
    // Store newly uploaded images to S3, add their keys to the pet doc then delete from local storage
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const { Key } = await S3.uploadImage((req.files as Express.Multer.File[])[i]);
        pet.images.push(Key);
        fs.unlink((req.files as Express.Multer.File[])[i].path); // await
      }
    }
    // Save the updated pet doc to db and respond it back
    await pet.save();
    res.status(200).json(pet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
