import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../components/utils/format";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const user = localStorage.getItem("token");
    if (!user) {
      alert("Bạn cần đăng nhập để xem giỏ hàng!");
      navigate("/login"); // Điều hướng đến trang đăng nhập
      return;
    }

    // Lấy giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const fixedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity ?? 1 // Nếu quantity bị undefined, gán lại là 1
    }));
    setCartItems(fixedCart);
  }, [navigate]);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const handleQuantityChange = (index, amount) => {
    const updatedCart = [...cartItems];

    if (!updatedCart[index].quantity || isNaN(updatedCart[index].quantity)) {
      updatedCart[index].quantity = 1;
    }

    updatedCart[index].quantity += amount;

    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }

    updateCart(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("email"); // Nếu bạn lưu email ở localStorage
  
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      const response = await fetch("http://127.0.0.1:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // nếu có middleware kiểm tra token
        },
        body: JSON.stringify({
          items: cartItems,
          totalPrice,
          userEmail
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`Đặt hàng thành công!\nTổng tiền: ${formatCurrency(totalPrice)}`);
        localStorage.removeItem("cart");
        navigate("/success"); // hoặc điều hướng tới trang cảm ơn
      } else {
        alert("Lỗi khi đặt hàng: " + data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Đã xảy ra lỗi khi thanh toán.");
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 border-b">
              {/* Hiển thị hình ảnh sản phẩm */}
              <img src={`http://127.0.0.1:5000/${item.imageUrl}`} alt={item.productName} className="w-16 h-16 object-cover rounded" />

              {/* Thông tin sản phẩm */}
              <div className="flex-1 ml-4">
                <span>{item.productName} - {formatCurrency(item.price)}</span>
                <div className="flex items-center mt-2">
                  <button 
                    onClick={() => handleQuantityChange(index, -1)} 
                    className="px-2 py-1 bg-gray-200 text-black rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(index, 1)} 
                    className="px-2 py-1 bg-gray-200 text-black rounded">+</button>
                </div>
              </div>

              {/* Tổng tiền sản phẩm */}
              <span className="ml-4 font-semibold">
                Tổng: {formatCurrency(item.price * item.quantity)}
              </span>

              {/* Nút xoá sản phẩm */}
              <button 
                onClick={() => handleRemoveItem(index)} 
                className="text-red-500 hover:text-red-700 ml-6">
                Remove
              </button>
            </div>
          ))}
          <button 
            onClick={handleCheckout} 
            className="mt-4 p-2 bg-green-500 text-white rounded">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
