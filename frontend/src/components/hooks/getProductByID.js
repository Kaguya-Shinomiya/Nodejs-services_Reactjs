import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        const productData = response.data.data;

        setProduct(productData);
        setSelectedImage(`http://localhost:5000/${productData.imageUrl}`); // Ảnh chính
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, selectedImage, setSelectedImage };
};

export default useFetchProduct;
