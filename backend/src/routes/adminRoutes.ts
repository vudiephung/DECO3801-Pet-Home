import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import secret from '../jwtSecret';
import Admin from '../models/Admin';
import { verifyAdmin } from '../middleware/authMiddleware';

const router = Router();

const sessionDuration = 60 * 60; // 1 hour in seconds
const createToken = (userId: string) => {
  return jwt.sign({ userId }, secret, {
    expiresIn: sessionDuration,
  });
};

router.get('/admin', (req: Request, res: Response) => {
  const token = req.cookies.adminToken;
  if (token) {
    jwt.verify(token, secret, (err: any) => {
      if (err) {
        res.render('admin-signin');
      } else {
        res.redirect('/shelter-signup');
      }
    });
  } else {
    res.render('admin-signin');
  }
});

router.post('/admin', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const adminUser = await Admin.findOne({ username }).exec();
    if (adminUser) {
      const correctPassword = await bcrypt.compare(password, adminUser.password);
      if (correctPassword) {
        const token = createToken(adminUser._id);
        res.cookie('adminToken', token, { httpOnly: true, maxAge: sessionDuration * 1000 });
        res.status(200).json({ success: 'Admin Authenticated' });
      } else {
        res.status(400).json({ error: 'Incorrect username or password' });
      }
    } else {
      res.status(400).json({ error: 'Incorrect username or password' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

router.get('/admin-signout', (req: Request, res: Response) => {
  res.cookie('adminToken', '', { maxAge: 1 });
  res.redirect('/admin');
});

router.get('/add-post', verifyAdmin, (req: Request, res: Response) => {
  res.render('add-blog-post');
});

router.get('/shelter-signup', verifyAdmin, (req: Request, res: Response) => {
  res.render('shelter-signup');
});

export default router;
