import { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          throw new Error("You must be logged in to view products.");
        }

        const res = await fetch("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Could not fetch products (unauthorized or server error).");
        }

        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchProducts();
  }, [token]);

  // DELETE handler
  const handleDelete = async (productId) => {
    try {
      if (!token) {
        throw new Error("Not authorized to delete products.");
      }

      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {products && (
        <ProductListings
          products={products}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;
