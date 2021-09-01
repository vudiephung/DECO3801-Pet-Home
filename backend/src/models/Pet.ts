import mongoose from 'mongoose';

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
  pictures: {
    // Multiple S3 IDs of pictures
    type: [String],
  },
  description: {
    // Multiple description paragraphs
    type: [String],
  },
});

const Pet = mongoose.model('pet', petSchema);

export default Pet;
