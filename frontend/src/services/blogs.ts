/* eslint-disable import/prefer-default-export */
import instance from './config';
import { Blog } from '../models/blog';

export const getAllBlogs = async () => (await instance.get('/blogs')).data;

export const reactBlog = async (blog: Blog) => {
  const res = await instance.post('/react-post', {
    postId: blog._id,
    postLiked: !blog.liked,
  });
  return res.data;
};
