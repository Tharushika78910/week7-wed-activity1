import { useState } from "react";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (object) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
      return;
    }

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify(data));

    setIsLoading(false);
  };

  return { login, isLoading, error };
}
