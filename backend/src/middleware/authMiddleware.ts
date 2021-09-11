import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

import secret from '../jwtSecret';

const clearUploads = async (files: any) => {
  if (files) {
    for (let i = 0; i < files.length; i++) {
      await fs.unlink(files[i].path);
    }
  }
};
const verifyAccess = (req: any, res: any, next: any) => {
  if (!req.header('Authorization')) {
    clearUploads(req.files);
    res.status(400).json({ error: 'Authentication failed: access denied' });
  } else {
    const auth = req.header('Authorization').split(' ');

    if (auth.length === 2 && /^Bearer$/i.test(auth[0])) {
      const token = auth[1];
      jwt.verify(token, secret, (err: any, decodedToken: any) => {
        if (err) {
          clearUploads(req.files);
          res.status(400).json({ error: 'Authentication failed: access denied' });
        } else {
          req.userId = decodedToken.userId;
          next();
        }
      });
    } else {
      clearUploads(req.files);
      res.status(400).json({ error: 'Authentication failed: access denied' });
    }
  }
};

export default verifyAccess;
