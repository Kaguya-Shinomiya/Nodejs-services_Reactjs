require('dotenv').config();
let jwt = require('jsonwebtoken')
let userController = require('../controllers/users')
module.exports = {
    check_authentication: async function (req, res, next) {
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập" });
        }

        let authorization = req.headers.authorization;
        if (authorization.startsWith("Bearer ")) {
            let token = authorization.split(" ")[1];
            let result = jwt.verify(token, process.env.JWT_SECRET);
            if (result) {
                let id = result.id;
                let user = await userController.GetUserById(id);
                req.user = user;
                next();
            }
        } else {
            console.log("hâhahaha")
            return res.status(401).json({ message: "Bạn chưa đăng nhập" });
        }
    },
    check_authorization: function (requiredRole) {
        return function (req, res, next) {
            let role = req.user.role.name;
            if (requiredRole.includes(role)) {
                next();
            } else {
                return res.status(401).json({ message: "Bạn không có quyền" });
            }
        }
    }
}