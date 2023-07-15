import Mainhome from '../database/models/mainhome_model.js';
import md5 from 'md5';

const MainhomeService = {
  createMainhomePost: async data => {
    const newPost = new Mainhome({
      ...data,
      email: data.email ? md5(data.email.trim().toLowerCase()) : undefined,
    });
    try {
      await newPost.save();
      return newPost;
    } catch (err) {
      throw err;
    }
  },

  getAllMainhomePosts: async () => {
    try {
      const posts = await Mainhome.find().sort({ createdAt: -1 });
      return posts.map(post => ({
        ...post._doc,
        email: post.email ? md5(post.email.trim().toLowerCase()) : undefined,
      }));
    } catch (err) {
      throw err;
    }
  },

  updateMainhomePost: async (postId, data) => {
    try {
      const updatedPost = await Mainhome.findByIdAndUpdate(
        postId,
        {
          ...data,
          email: data.email ? md5(data.email.trim().toLowerCase()) : undefined,
        },
        {
          new: true,
        },
      );
      return updatedPost;
    } catch (err) {
      throw err;
    }
  },

  deleteMainhomePost: async postId => {
    try {
      const deletedPost = await Mainhome.findByIdAndDelete(postId);
      return deletedPost;
    } catch (err) {
      throw err;
    }
  },
};

export default MainhomeService;
