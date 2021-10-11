import { Router, Request, Response, NextFunction } from 'express';
import * as fs from 'fs/promises';
import multer from 'multer';
import * as S3 from '../utilities/s3';
import verifyAccess, { verifyAdmin } from '../middleware/authMiddleware';
import BlogPost from '../models/BlogPost';
import User from '../models/User';

const router = Router();
const upload = multer({ dest: './pet-image-uploads/' });

router.post(
  '/add-post',
  upload.single('image'),
  verifyAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Upload the image to S3 then delete local one
      let imageKey: string = '';
      if (req.file) {
        const result = await S3.uploadImage(req.file);
        imageKey = result.Key;
        fs.unlink(req.file.path); // await
      }
      // Create the new blog post
      const { title, snippet, url } = req.body;
      const newPost = await BlogPost.create({
        image: imageKey,
        title,
        snippet,
        url,
        likeCount: 0,
      });
      res.status(201).json({ postId: newPost._id });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
);

router.post('/react-post', verifyAccess, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId, postLiked } = req.body;
    const post = await BlogPost.findById(postId).exec();
    const user = await User.findById((req as any).userId).exec();
    if (postLiked) {
      post.likeCount = post.likeCount + 1;
      user.likedPosts.push(postId);
    } else {
      post.likeCount = post.likeCount - 1;
      const postIdIndex = user.likedPosts.indexOf(postId);
      user.likedPosts.splice(postIdIndex, 1);
    }
    post.save(); // await
    user.save(); // await
    res.status(200).json({ success: 'Post Reaction Saved' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get('/blogs', verifyAccess, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await BlogPost.find().sort({ likeCount: -1 }).exec();

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

export default router;
