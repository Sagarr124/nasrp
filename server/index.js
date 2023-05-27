import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import stripePackage from "stripe";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import jobRoutes from "./routes/jobs.js";
import orderRoutes from "./routes/orders.js";
import messageRoutes from "./routes/messages.js";
import categoryRoutes from "./routes/categories.js";
import notificationRoutes from "./routes/notifications.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Conversation from "./models/Conversation.js";
import Message from "./models/Message.js";
import Client from "./models/Client.js";
import Freelancer from "./models/Freelancer.js";
import Category from "./models/Category.js";
import Job from "./models/Job.js";
import Order from "./models/Order.js";
import Payment from "./models/Payment.js";
import { users, posts, conversations, messages, clients, freelancers, category, jobs, orders, payment } from "./data/index.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


/* MESSAGING */
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', async (message) => {
    console.log('received message at server-side:', message);

    const newMessage = new Message({
      conversationId: message.conversationId,
      senderId: message.senderId,
      recipientId: message.recipientId,
      content: message.content,
    });

    try {
      const savedMessage = await newMessage.save();
      console.log('Message saved to database:', savedMessage);

      io.to(recipientId).emit('chat message', savedMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });
});

/* PAYMENT */
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

app.post("/payments", verifyToken, async (req, res) => {
  try {
    const { jobTitle, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: jobTitle
            },
            unit_amount: amount * 100
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.CLIENT_URL}/orders`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard`
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/jobs", jobRoutes);
app.use("/orders", orderRoutes);
app.use("/messages", messageRoutes);
app.use("/categories", categoryRoutes);
app.use("/notifications", notificationRoutes);


/* MONGOOSE SETUP */
mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log(`MongoDB connected successfully.`);

  /* ADD DATA ONE TIME */
  // User.insertMany(users);
  // Post.insertMany(posts);
  // Client.insertMany(clients);
  // Freelancer.insertMany(freelancers);
  // Conversation.insertMany(conversations);
  // Message.insertMany(messages);
  // Category.insertMany(category);
  // Job.insertMany(jobs);
  // Order.insertMany(orders);
  // Payment.insertMany(payment);
})
.catch((error) => console.log(`${error} did not connect`));


const PORT = process.env.PORT || 6001;

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));