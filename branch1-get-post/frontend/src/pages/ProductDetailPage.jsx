import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user token
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // DELETE /api/products/:id
  const deleteProduct = async (id) => {
    if (!token) {
      setError("Unauthorized: Please log in.");
      return false;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message);
      return false;
    }
  };

  // GET /api/products/:productId
  useEffect(() => {
    const fetchProduct = async () => {
      if (!token) {
        setError("Unauthorized: Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
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
  }, [productId, token]);

  const onDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    const success = await deleteProduct(id);
    if (success) navigate("/");
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

            <div className="detail-buttons">
              <Link
                to={`/products/${product._id}/edit`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                onClick={() => onDeleteClick(product._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ProductDetailPage;
