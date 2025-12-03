require("dotenv").config();
const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Product Routes
app.use("/api/products", productRouter);

// Custom Middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });