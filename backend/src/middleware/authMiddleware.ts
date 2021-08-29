import * as jwt from 'jsonwebtoken';
import secret from '../jwtSecret';

const verifyAccess = (req: any, res: any, next: any) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, secret, (err: any, decodedToken: any) => {
      if (err) {
        res.status(400).json({ error: 'Authentication failed: access denied' });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ error: 'Authentication failed: access denied' });
  }
};

export default verifyAccess;
