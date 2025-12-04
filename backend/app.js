require("dotenv").config();
const express = require("express");
const app = express();

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const requireAuth = require("./middleware/requireAuth");

const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

console.log("SECRET:", process.env.SECRET);


// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Public Routes (NO auth)
app.use("/api/user", userRouter);

// Protected Routes (require login)
app.use("/api/products", requireAuth, productRouter);

// Custom Middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
