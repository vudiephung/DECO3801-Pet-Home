import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  (this as any).password = await bcrypt.hash((this as any).password, salt);
  next();
});

const User = mongoose.model('user', userSchema);

export default User;
