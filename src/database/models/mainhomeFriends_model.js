import mongoose from 'mongoose';

const mainhomeFriendsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const MainhomeFriends = mongoose.model(
  'MainhomeFriends',
  mainhomeFriendsSchema,
);
export default MainhomeFriends;
