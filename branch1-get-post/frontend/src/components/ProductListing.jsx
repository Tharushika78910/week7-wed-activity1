import { Link } from "react-router-dom";

const ProductListing = ({ product, onDelete }) => {
  return (
    <div className="product-preview">
      <h2>{product.title}</h2>

      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stockQuantity}</p>
      <p>Supplier: {product.supplier.name}</p>

      <Link to={`/products/${product.id}`} className="view-btn">
        View
      </Link>

      <button
        onClick={() => onDelete(product.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductListing;
