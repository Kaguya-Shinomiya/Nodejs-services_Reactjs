import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchProduct from "../components/hooks/getProductByID"; 
import { handleAddToCart } from "../components/utils/cart";
import ProductReview from '../components/hooks/ProductReview';


import { formatCurrency } from "../components/utils/format";

const ProductDetail = () => {
  const { id } = useParams(); 
  const { product, loading, selectedImage, setSelectedImage } = useFetchProduct(id);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (loading) return <div className="text-center text-xl mt-10">Đang tải...</div>;
  if (!product) return <div className="text-center text-xl mt-10 text-red-500">Không tìm thấy sản phẩm</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">

        
        <div className="mt-10">
          <ProductReview productId={id} />
        </div>
        
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt={product.productName}
            className="w-96 h-auto rounded-lg shadow-md"
          />

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

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>


          <div className="mt-4 flex items-center gap-4">
            <p className="text-red-500 text-2xl font-semibold">{formatCurrency(product.price)}</p>
            {product.price < product.old_price && (
              <p className="text-gray-500 line-through">{formatCurrency(product.old_price)}</p>
            )}

          </div>


          <p className="text-gray-500 mt-2">Danh mục: {product.categoryId?.name}</p>
          <p className="text-gray-500">Nhà sản xuất: {product.producerId?.name}</p>
          <p className="text-gray-500">Kho hàng: {product.stockQuantity} sản phẩm</p>
          {product.isPreOrder && (
            <p className="text-blue-500 flex items-center gap-2">
              <i className="fa fa-fire text-blue-500"></i> Sản phẩm đặt trước!
            </p>
          )}
          {product.isNewProduct && (
            <p className="text-green-500 flex items-center gap-2">
              <i className="fa fa-star text-green-500"></i> Sản phẩm mới
            </p>
          )}
          <p className="text-yellow-500 flex items-center gap-2">
            <i className="fa fa-star-half-alt text-yellow-500"></i>
            {(product.rating || 0).toFixed(1)}/5 - Đã bán {product.sold} sản phẩm
          </p>
          <div className="flex items-center mt-4">
            <button className="bg-gray-300 px-3 py-1 rounded-l"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <input type="text" value={quantity} readOnly
              className="w-12 text-center border-t border-b border-gray-300" />
            <button className="bg-gray-300 px-3 py-1 rounded-r"
              onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

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
