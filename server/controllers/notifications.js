import Notification from "../models/Notification.js";

/* CREATE */
export const sendNotification = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const newNotification = new Notification({
      senderId,
      receiverId,
      text,
      read: false,
    });
    await newNotification.save();

    const notifications = await Notification.find();
    res.status(201).json(notifications);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


/* READ */
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ receiverId: userId, read: false });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
export const readNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};