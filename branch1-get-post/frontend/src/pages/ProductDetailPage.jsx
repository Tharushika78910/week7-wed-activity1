import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // DELETE /api/products/:id
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  // GET /api/products/:productId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const onDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        product && (
          <>
            <h2>{product.title}</h2>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock Quantity: {product.stockQuantity}</p>

            {product.supplier && (
              <>
                <h3>Supplier Info</h3>
                <p>Name: {product.supplier.name}</p>
                <p>Email: {product.supplier.contactEmail}</p>
                <p>Phone: {product.supplier.contactPhone}</p>
                {product.supplier.rating && (
                  <p>Rating: {product.supplier.rating} / 5</p>
                )}
              </>
            )}

            <button onClick={() => onDeleteClick(product.id)}>Delete</button>
          </>
        )
      )}
    </div>
  );
};

export default ProductDetailPage;
