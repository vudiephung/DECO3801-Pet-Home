import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  snippet: {
    type: String,
  },
  url: {
    type: String,
  },
  likeCount: {
    type: Number,
  },
});

const BlogPost = mongoose.model('blogpost', blogPostSchema);

export default BlogPost;
