import  { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setEError] = useState(null);


  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      if (body) {
        body = JSON.stringify(body);
      }
      headers["Content-Type"] = "application/json";
      try {
        const response = await fetch(url, { method, body, headers });
        const data = await  response.json();
        if (!response.ok) {
          throw new Error(data.message || "some error occured");
        }
        setLoading(false);
        return data;
      } catch (e) {
        
        setLoading(false);
        setEError(e.message);        
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => {
    setEError(null);
  }, []);
  return { request, loading, error, clearError };
};
