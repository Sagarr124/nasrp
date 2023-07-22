import Job from "../models/Job.js";

/* CREATE */
export const postJob = async (req, res) => {
  try {
    const { clientId, title, categoryId, description, dueDate } = req.body;

    const newJob = new Job({
      clientId,
      title,
      categoryId,
      description,
      dueDate,
    });
    await newJob.save();

    const jobs = await Job.find();
    res.status(201).json(jobs);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const removeJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findByIdAndRemove(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
