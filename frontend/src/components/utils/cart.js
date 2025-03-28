export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
    let cart = getCart();
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const handleAddToCart = (product, navigate) => {
    const isAuthenticated = localStorage.getItem("token"); // Kiểm tra đăng nhập

    if (!isAuthenticated) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        navigate("/login"); // Chuyển hướng sang trang login
        return;
    }

    addToCart(product);
    alert("Đã thêm vào giỏ hàng!");
};
