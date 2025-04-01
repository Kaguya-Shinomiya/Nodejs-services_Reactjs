export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};


export const handleAddToCart = (product, navigate, num = 1) => {
    const isAuthenticated = localStorage.getItem("token"); // Kiểm tra đăng nhập

    if (!isAuthenticated) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        navigate("/login"); // Chuyển hướng sang trang login
        return;
    }
    let i = 0;
    while (i < num) {
        //console.log(i);
        addToCart(product);
        i++;
    }
    
    alert("Đã thêm vào giỏ hàng!");
};
