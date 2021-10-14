import mongoose from 'mongoose';
import Admin from '../models/Admin';
import { hashPassword } from '../models/User';

mongoose
  .connect('mongodb://127.0.0.1:27017/dev3801', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(async () => {
    try {
      const username = 'admin';
      const password = 'ResiliencePetHomeDECO3801';
      const hashedPassword = await hashPassword(password);
      await Admin.create({
        username,
        password: hashedPassword,
      });
      console.log('New Admin Created');
      process.exit(0);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });
