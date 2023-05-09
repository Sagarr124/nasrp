import Message from "../models/Message.js";

export const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .populate('senderId', 'username') // Populate the senderId field with the username
      .populate('receiverId', 'username') // Populate the receiverId field with the username
      .sort({ createdAt: 'asc' }); // Sort messages by their creation timestamp in ascending order


    res.status(200).json(messages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};