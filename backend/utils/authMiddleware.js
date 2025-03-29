const jwt = require("jsonwebtoken");
let constants = require('../utils/constants');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //console.log("Tới đc authMiddleware")
    //console.log("JWT_SECRET trên server:", constants.SECRET_KEY);
    // console.log(authHeader)
    // console.log(authHeader.startsWith("Bearer "))
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        
        return res.status(401).json({ message: "Không có token, truy cập bị từ chối!" });
    }

    const token = authHeader.split(" ")[1]; // Lấy token sau "Bearer "
    //console.log(token)
    try {
        const decoded = jwt.verify(token, constants.SECRET_KEY);
        req.user = decoded; // Lưu thông tin user từ token vào req
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token không hợp lệ!" });
    }
};

module.exports = authMiddleware;
