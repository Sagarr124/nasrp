import Category from "../models/Category.js";

/* READ */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
