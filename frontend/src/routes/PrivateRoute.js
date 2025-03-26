import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, roles }) => {
    const token = localStorage.getItem("token"); // Kiểm tra token
    const userRole = localStorage.getItem("role"); // Lấy role từ localStorage

    // Nếu không có token => Chuyển hướng về trang login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Nếu có roles cần kiểm tra và role user không hợp lệ => Cấm truy cập
    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default PrivateRoute;
