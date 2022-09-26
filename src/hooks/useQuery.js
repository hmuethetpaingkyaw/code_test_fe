import { useState, useEffect } from "react";
import { getData } from "services/apiService";

const useQuery = (url) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleApiCall = async (url) => {
    try {
      const result = await getData(url);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApiCall(url);
  }, [url]);

  return { response, error, loading };
};

export default useQuery;
