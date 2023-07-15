import Chat from '../database/models/chat_model.js';
import Message from '../database/models/message_model.js';
import mongoose from 'mongoose';

const ChatService = {
  startChat: async (userId, anonymousUserId) => {
    try {
      const newChat = new Chat({
        users: [
          new mongoose.Types.ObjectId(userId),
          new mongoose.Types.ObjectId(anonymousUserId),
        ],
      });

      await newChat.validate();

      await newChat.populate('users');
      await newChat.save();
      return newChat;
    } catch (error) {
      throw error;
    }
  },

  getUserChats: async (userId) => {
    try {
      const objectId = new mongoose.Types.ObjectId(userId);
      const chats = await Chat.find({ 'users.0': objectId }).populate(
        'users',
        'userName email',
      );
      return chats;
    } catch (error) {
      throw error;
    }
  },

  getChatMessages: async (chatId) => {
    try {
      const messages = await Message.find({ chat: chatId }).populate(
        'sender',
        'email',
      );
      return messages;
    } catch (error) {
      throw error;
    }
  },

  deleteChat: async (chatId) => {
    try {
      const deletedChat = await Chat.findByIdAndDelete(chatId);
      return deletedChat;
    } catch (error) {
      throw error;
    }
  },
  createMessage: async (senderId, chatId, content) => {
    try {
      const newMessage = new Message({
        sender: senderId,
        chat: chatId,
        content: content,
      });
      await newMessage.save();
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        { lastMessage: newMessage._id },
        { new: true },
      );
      return chat;
    } catch (error) {
      throw error;
    }
  },
};

export default ChatService;
