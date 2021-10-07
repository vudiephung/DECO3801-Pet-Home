import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const petSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  breed: {
    type: String,
  },
  age: {
    type: Number,
  },
  images: {
    // Multiple S3 IDs of images
    type: [String],
  },
  description: {
    // Multiple description paragraphs
    type: [String],
  },
  shelter: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Pet = mongoose.model('pet', petSchema);

export default Pet;
