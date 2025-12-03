import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials), // { name, password }
      });

      const data = await response.json();

      // Signup failed
      if (!response.ok) {
        setError(data.error || "Signup failed");
        setIsLoading(false);
        return null;
      }

      // Save registered user + token
      localStorage.setItem("user", JSON.stringify(data));

      setIsLoading(false);
      return data; // allow calling component to use returned user if needed
    } catch (err) {
      setError("Unable to connect to server");
      setIsLoading(false);
      return null;
    }
  };

  return { signup, isLoading, error };
}
