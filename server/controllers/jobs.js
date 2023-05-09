import Job from "../models/Job.js";

/* CREATE */
export const postJob = async (req, res) => {
  try {
    const { clientId, title, categoryId, description } = req.body;

    if (Object.keys(req.body).length === 0) {
      // req.body is empty
      console.log("Request body is empty");
    } else {
      // req.body is not empty
      console.log("Request body is not empty");
    }
    
    
    // const newJob = new Job({
    //   clientId,
    //   title,
    //   categoryId,
    //   description,
    // });
    // await newJob.save();

    // const jobs = await Job.find();
    // res.status(201).json(jobs);
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
