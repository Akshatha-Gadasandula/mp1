const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

// Other routes
readdirSync("./routes").filter(file => file.endsWith(".js")).forEach((route) => {
  if (route !== 'authRoutes.js') {
    app.use("/api/v1", require(`./routes/${route}`));
  }
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
