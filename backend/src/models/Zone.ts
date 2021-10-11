import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  images: {
    type: [String],
  },
});

const zoneSchema = new mongoose.Schema({
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  locality: {
    type: String,
    unique: true,
  },
  locations: {
    type: [locationSchema],
  },
});

const Zone = mongoose.model('zone', zoneSchema);

export default Zone;
