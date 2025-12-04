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
        body: JSON.stringify(credentials),  
      });

      let data;

      try {
        data = await response.json();
      } catch {
        setError("Invalid response from server");
        setIsLoading(false);
        return null;
      }

      // ❌ Signup failed
      if (!response.ok) {
        setError(data.error || "Signup failed");
        setIsLoading(false);
        return null;
      }

     
      localStorage.setItem("user", JSON.stringify(data));

      setIsLoading(false);
      return data;
    } catch (err) {
      setError("Unable to connect to server");
      setIsLoading(false);
      return null;
    }
  };

  return { signup, isLoading, error };
}
