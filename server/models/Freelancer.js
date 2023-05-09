import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  { timestamps: true }
);

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;
