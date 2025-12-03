const ProductListing = ({ product }) => {
  return (
    <div className="product-preview">
      <h2>{product.title}</h2>

      <p>Category: {product.category}</p>

      <p>Description: {product.description}</p>

      <p>Price: ${product.price}</p>

      <p>Stock: {product.stockQuantity}</p>

      <p>Supplier: {product.supplier.name}</p>
    </div>
  );
};

export default ProductListing;