import Payment from "../models/Payment.js";
import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

/* CREATE */
export const sendPayment = async (req, res) => {
  try {
    const { orderId, jobTitle, amount } = req.body;

    const payment = new Payment({
      orderId,
      amount,
    });

    await payment.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: {
        price_data: {
          currency: 'usd',
          product_data: {
            name: jobTitle
          },
          unit_amount: (amount / 300) * 100
        },
        quantity: 1
      },
      success_url: `${process.env.CLIENT_URL}/orders`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard`
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
