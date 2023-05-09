import Notification from "../models/Notification.js";

/* CREATE */
export const sendNotification = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const newNotification = new Notification({
      senderId,
      receiverId,
      text,
      read,
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
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
