import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User, { hashPassword } from '../models/User';
import secret from '../jwtSecret';
import { verifyAdmin } from '../middleware/authMiddleware';

const router = Router();

const sessionDuration = 365 * 24 * 60 * 60; // 1 year in seconds
const createToken = (userId: string) => {
  return jwt.sign({ userId }, secret, {
    expiresIn: sessionDuration,
  });
};

// API only used for shelter user sign up
router.post('/shelter-signup', verifyAdmin, async (req, res, next) => {
  const { email, username, password, address, contactNumber } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user: any = await User.create({
      email,
      username,
      password: hashedPassword,
      isShelter: true,
      address,
      contactNumber,
      ownedPets: [],
      favoritePets: null,
      likedPosts: null,
    });
    const token = createToken(user._id);
    res.status(201).json({
      userId: user._id,
      username,
      isShelter: user.isShelter,
      address: user.address,
      contactNumber: user.contactNumber,
      token,
    });
  } catch (err) {
    if ((err as any).code === 11000) {
      res.status(400).json({ error: 'Email address already registered' });
    }
  }
});

// API only used by regular users (who sign up via the app)
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user: any = await User.create({
      email,
      username,
      password: hashedPassword,
      isShelter: false,
      ownedPets: null,
      favoritePets: [],
      likedPosts: [],
    });
    const token = createToken(user._id);
    res.status(201).json({
      userId: user._id,
      username,
      isShelter: user.isShelter,
      token,
    });
  } catch (err) {
    // Email duplication
    if ((err as any).code == 11000) {
      res.status(400).json({ error: 'Email address already registered' });
    }
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('likedPosts', '_id').exec();
  if (user) {
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      const token = createToken(user._id);
      if (user.isShelter) {
        return res.status(200).json({
          userId: user._id,
          email: user.email,
          username: user.username,
          isShelter: true,
          address: user.address,
          contactNumber: user.contactNumber,
          ownedPets: user.ownedPets,
          token,
        });
      }
      return res.status(200).json({
        userId: user._id,
        email: user.email,
        username: user.username,
        favoritePets: user.favoritePets,
        likedPosts: user.likedPosts,
        isShelter: false,
        token,
      });
    }
  }
  return res.status(400).json({ error: 'Incorrect email or password' });
});

export default router;
