var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler');
let jwt = require('jsonwebtoken');
let { check_authentication } = require('../utils/check_auth');
let bcrypt = require('bcrypt');
let authMiddleware = require("../utils/authMiddleware");

/* Đăng nhập */
router.post('/login', async function (req, res, next) {
    try {
        ///console.log("Login request received:", req.body);
        let { email, password } = req.body;
        let result = await userController.Login(email, password);
        if (!result) {
            //return CreateErrorRes(res, 400, "Invalid username or password");
            return res.status(400).json({ message: "Invalid email or password" });
        }
        //console.log(result.role.name)
        let token = jwt.sign(
            {
                id: result._id,
                role: result.role.name, // Chỉ lấy tên role thay vì object
                exp: Math.floor(Date.now() / 1000) + 86400 // Dùng 'exp' theo chuẩn JWT
            },
            process.env.JWT_SECRET// Đảm bảo key đồng nhất
        );


        return CreateSuccessRes(res, 200, { token, user: result });
    } catch (error) {
        next(error);
        // console.log("đã bị lỗi ở file auth.js")
        //return res.status(500).json({ message: error.message});
    }
});

/* Đăng ký */
router.post('/signup', async function (req, res, next) {
    try {
        
        let { username, password, email, fullName } = req.body;

        // Kiểm tra username & email đã tồn tại chưa
        let existingUser = await userController.FindUser(username, email);
        if (existingUser) {
            return CreateErrorRes(res, 400, "Username or Email already exists");
        }

        
        let result = await userController.CreateAnUser(username, password, email,fullName, 'user');

        let token = jwt.sign({
            id: result._id,
            expire: Math.floor(Date.now() / 1000) + 86400
        }, process.env.JWT_SECRET);

        return CreateSuccessRes(res, 200, { token, user: result });
    } catch (error) {
        next(error);
    }
});

/* Lấy thông tin người dùng */
router.get("/me", check_authentication, async function (req, res, next) {
    if (!req.user) {
        return CreateErrorRes(res, 404, "User not found");
    }
    return CreateSuccessRes(res, 200, req.user);
});

/* Đổi mật khẩu */
router.post('/changepassword', check_authentication, async function (req, res, next) {
    try {
        let { oldpassword, newpassword } = req.body;

        // Kiểm tra mật khẩu cũ có đúng không
        if (!bcrypt.compareSync(oldpassword, req.user.password)) {
            return CreateErrorRes(res, 400, "Old password is incorrect");
        }

        // Hash mật khẩu mới trước khi lưu
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(newpassword, salt);

        let user = req.user;
        user.password = hashedPassword;
        await user.save();

        return CreateSuccessRes(res, 200, "Password changed successfully");
    } catch (error) {
        next(error);
    }
});


router.get("/check-role", authMiddleware, (req, res) => {
    try {
        //console.log(req.user)
        if (!req.user || !req.user.role) {
            return res.status(400).json({ message: "Không tìm thấy quyền của người dùng" });
        }

        return res.json({ role: req.user.role }); // Trả về role từ token
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server" });
    }
});

// router.get("/check-role", (req, res) => {
//     const authHeader = req.headers.authorization;
//     console.log("Header nhận được:", authHeader); // Xem token có tới server không
// });

module.exports = router;
