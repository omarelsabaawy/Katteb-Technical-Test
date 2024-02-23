const express = require("express");
const cors = require("cors");
const compression = require("compression");
const socket = require("socket.io");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use(compression({
  level: 6,
  threshold: 10 * 1000,
}));

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Server Setup
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Socket.io Setup
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});