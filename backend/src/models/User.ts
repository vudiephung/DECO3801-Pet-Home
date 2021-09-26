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
  isShelter: {
    type: Boolean,
  },
  address: {
    // Only for shelter
    type: String,
  },
  contactNumber: {
    // Only for shelter
    type: String,
  },
  ownedPets: {
    // List of IDs. Only for shelter
    type: [String],
  },
  favoritePets: {
    // List of IDs. Only for user
    type: [String],
  },
});

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const User = mongoose.model('user', userSchema);

export default User;
