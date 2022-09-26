import { useState } from "react";
import { sendData } from "services/apiService";

const useMutation = (url) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const executeSendData = (url) => {
    const apiUrl = url;
    const setData = async (values, type) => {
      try {
        if (values) await sendData(apiUrl, values, type);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    return setData;
  };

  const executeApi = executeSendData(url);
  return [{ error, loading }, executeApi];
};

export default useMutation;
