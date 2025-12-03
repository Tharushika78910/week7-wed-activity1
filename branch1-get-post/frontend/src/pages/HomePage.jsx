import { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
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
  }, []);

  // DELETE handler
  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove deleted product from UI
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
