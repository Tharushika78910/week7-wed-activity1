import ProductListing from "./ProductListing";

const ProductListings = ({ products, onDelete }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductListing
          key={product._id}
          product={product}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductListings;