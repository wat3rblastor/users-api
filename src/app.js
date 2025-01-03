const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin
  credentials: true // Allow credentials (cookies, headers)
};

app.use(cors(corsOptions))
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;