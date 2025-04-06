import { useState, useEffect } from "react";
import axios from "axios";

const useProducers = () => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/producers");
        setProducers(response.data.data || []); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducers();
  }, []);

  return { producers, loading, error };
};

export default useProducers;
