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

router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({ email, username, password });
    const token = createToken(user._id);
    res.status(201).json({
      userId: user._id,
      username: username,
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
      res.status(200).json({
        userId: user._id,
        username: user.username,
        token: token,
      });
    } else {
      res.status(400).json({ error: 'Incorrect email or password' });
    }
  } else {
    res.status(400).json({ error: 'Incorrect email or password' });
  }
});

export default router;
