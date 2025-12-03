const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

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