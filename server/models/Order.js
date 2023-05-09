import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true
    },
    description: {
      type: String,
      required: true,
      min: 10,
    },
    amount: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
