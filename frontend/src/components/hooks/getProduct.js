import { useEffect, useState } from "react";

const useProducts = (category) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!category) return; 

            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:5000/products/category_name/${category}`);
                const data = await response.json();
                //console.log("Fetched Products:", data.data); // Kiểm tra dữ liệu API
                setProducts(data.data || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]); // Gọi API mỗi khi category thay đổi

    return { products, loading };
};

export default useProducts;
