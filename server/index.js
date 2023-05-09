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
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import jobRoutes from "./routes/jobs.js";
import orderRoutes from "./routes/orders.js";
import messageRoutes from "./routes/messages.js";
import categoryRoutes from "./routes/categories.js";
import notificationRoutes from "./routes/notifications.js"
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Message from "./models/Message.js";
import Client from "./models/Client.js";
import Freelancer from "./models/Freelancer.js";
import Category from "./models/Category.js";
import Job from "./models/Job.js";
import Order from "./models/Order.js";
import Payment from "./models/Payment.js";
import { users, posts, messages, clients, freelancers, category, jobs, orders, payment } from "./data/index.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


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
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  /* ADD DATA ONE TIME */
  // User.insertMany(users);
  // Post.insertMany(posts);
  // Client.insertMany(clients);
  // Freelancer.insertMany(freelancers);
  // Message.insertMany(messages);
  // Category.insertMany(category);
  // Job.insertMany(jobs);
  // Order.insertMany(orders);
  // Payment.insertMany(payment);
})
.catch((error) => console.log(`${error} did not connect`));

/* MESSAGING */
// const server = http.createServer(app);

// // Set up socket.io instance
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Listen for incoming socket connections
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   // Retrieve previous messages and emit them to the client
//   Message.find({}, (err, messages) => {
//     if (err) console.error(err);
//     socket.emit("message history", messages);
//   });

//   // Handle incoming socket events here
//   socket.on("send message", (data) => {
//     const message = new Message({
//       senderId: data.senderId,
//       receiverId: data.receiverId,
//       message: data.message,
//     });
//     message.save((err) => {
//       if (err) console.error(err);
//       io.emit("receive message", message);
//     });
//   });
// });


// server.listen(PORT, () => console.log(`Server Port: ${PORT}`));