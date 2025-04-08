import { useState, useEffect } from "react";

const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/blogs");
        const data = await response.json();
        if (response.ok) {
          setBlogs(data.data);
        } else {
          setError(data.message || "Failed to fetch blogs");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, setBlogs, loading, error }; 
};

export default useBlogs;
