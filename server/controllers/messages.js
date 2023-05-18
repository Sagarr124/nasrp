import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

/* READ */
export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    }).populate('participants', 'userName fullName picturePath');

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Find messages of the conversation
    const messages = await Message.find({ conversationId });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* CREATE */
export const createConversation = async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;
    
    // Check if the conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (existingConversation) {
      return res.status(409).json({ message: 'Conversation already exists.' });
    }

    // Create a new conversation
    const newConversation = new Conversation({
      participants: [senderId, recipientId],
    });

    await newConversation.save();

    res.status(201).json(newConversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, recipientId, content } = req.body;

    // Create a new message
    const newMessage = new Message({
      conversationId,
      senderId,
      recipientId,
      content,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
