import { useState, useEffect } from "react";
import { useParams,  useNavigate} from "react-router-dom";
import axios from "axios";
import { handleAddToCart } from "../components/utils/cart";


const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(""); // Ảnh đang hiển thị

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

  const navigate = useNavigate();
  
  if (loading) return <div className="text-center text-xl mt-10">Đang tải...</div>;
  if (!product) return <div className="text-center text-xl mt-10 text-red-500">Không tìm thấy sản phẩm</div>;

  

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
        
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col items-center">
          <img 
            src={selectedImage} 
            alt={product.productName} 
            className="w-96 h-auto rounded-lg shadow-md"
          />

          {/* Danh sách ảnh phụ */}
          <div className="flex gap-2 mt-4">
            <img 
              src={`http://localhost:5000/${product.imageUrl}`} 
              alt="Ảnh chính" 
              className="w-20 h-20 object-cover rounded-md cursor-pointer border-2"
              onClick={() => setSelectedImage(`http://localhost:5000/${product.imageUrl}`)}
            />
            {product.images.map((img) => (
              <img 
                key={img._id}
                src={`http://localhost:5000/${img.imageUrl}`} 
                alt="Ảnh phụ" 
                className="w-20 h-20 object-cover rounded-md cursor-pointer border-2"
                onClick={() => setSelectedImage(`http://localhost:5000/${img.imageUrl}`)}
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          {/* Giá sản phẩm */}
          <div className="mt-4 flex items-center gap-4">
            <p className="text-red-500 text-2xl font-semibold">{product.price?.toLocaleString()} VND</p>
            {product.old_price && (
              <p className="text-gray-500 line-through">{product.old_price.toLocaleString()} VND</p>
            )}
          </div>

          {/* Thông tin khác */}
          <p className="text-gray-500 mt-2">Danh mục: {product.categoryId?.name}</p>
          <p className="text-gray-500">Nhà sản xuất: {product.producerId?.name}</p>
          <p className="text-gray-500">Kho hàng: {product.stockQuantity} sản phẩm</p>
          {product.isPreOrder && <p className="text-blue-500">🔥 Sản phẩm đặt trước!</p>}
          {product.isNewProduct && <p className="text-green-500">🌟 Sản phẩm mới</p>}
          <p className="text-yellow-500">⭐ {product.rating}/5 - Đã bán {product.sold} sản phẩm</p>

          {/* Điều chỉnh số lượng */}
          <div className="flex items-center mt-4">
            <button className="bg-gray-300 px-3 py-1 rounded-l"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <input type="text" value={quantity} readOnly 
                   className="w-12 text-center border-t border-b border-gray-300"/>
            <button className="bg-gray-300 px-3 py-1 rounded-r"
                    onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button className="bg-blue-500 text-white mt-4 px-6 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => handleAddToCart(product, navigate, quantity)}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
