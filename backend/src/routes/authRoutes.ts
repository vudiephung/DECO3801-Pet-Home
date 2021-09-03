import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrytp from 'bcrypt';
import secret from '../jwtSecret';

const router = Router();

const sessionDuration = 365 * 24 * 60 * 60; // 1 year in seconds
const createToken = (userId: string) => {
  return jwt.sign({ userId }, secret, {
    expiresIn: sessionDuration,
  });
};

router.get('/shelter-signup', (req, res, next) => {
  res.render('shelter-signup');
});

// API only used for shelter user sign up
router.post('/shelter-signup', async (req, res, next) => {
  const { email, username, password, address, contactNumber } = req.body;
  try {
    const user: any = await User.create({
      email,
      username,
      password,
      isShelter: true,
      address,
      contactNumber,
      ownedPets: [],
      favoritePets: null,
    });
    const token = createToken(user._id);
    res.status(201).json({
      userId: user._id,
      username: username,
      isShelter: user.isShelter,
      address: user.address,
      contactNumber: user.contactNumber,
      token: token,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email address already registered' });
    }
  }
});

// API only used by regular users (who sign up via the app)
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user: any = await User.create({
      email,
      username,
      password,
      isShelter: false,
      ownedPets: null,
      favoritePets: [],
    });
    const token = createToken(user._id);
    res.status(201).json({
      userId: user._id,
      username: username,
      isShelter: user.isShelter,
      token: token,
    });
  } catch (err) {
    // Email duplication
    if (err.code == 11000) {
      res.status(400).json({ error: 'Email address already registered' });
    }
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const passwordIsCorrect = await bcrytp.compare(password, user.password);
    if (passwordIsCorrect) {
      const token = createToken(user._id);
      if (user.isShelter) {
        return res.status(200).json({
          userId: user._id,
          username: user.username,
          isShelter: true,
          address: user.address,
          contactNumber: user.contactNumber,
          token: token,
        });
      } else {
        return res.status(200).json({
          userId: user._id,
          username: user.username,
          isShelter: false,
          token: token,
        });
      }
    }
  }
  return res.status(400).json({ error: 'Incorrect email or password' });
});

export default router;
