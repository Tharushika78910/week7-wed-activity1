const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// 🔐 All routes below require authentication
router.use(requireAuth);

// GET all products
router.get("/", getAllProducts);

// CREATE product
router.post("/", createProduct);

// GET one product by ID
router.get("/:productId", getProductById);

// UPDATE product (optional)
router.put("/:productId", updateProduct);

// DELETE one product by ID
router.delete("/:productId", deleteProduct);

module.exports = router;
