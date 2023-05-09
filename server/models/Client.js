import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
