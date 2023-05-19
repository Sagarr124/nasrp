import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('fullName userName picturePath description country phoneNumber rating');
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};