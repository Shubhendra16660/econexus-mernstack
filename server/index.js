require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

// DB connect
const connectDB = require("./config/db");
connectDB();
app.use(cookieParser());
app.use(express.json());
// Routes
const authRoutes = require("./routes/authRoutes");
const ideaRoutes = require("./routes/ideaRoutes");


const PORT = process.env.PORT || 4000;

// Middlewares

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "optionsSuccessStatus": 204
}));


// Routes
app.get("/", (req, res) => {
  res.send("Econexus API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);


// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});