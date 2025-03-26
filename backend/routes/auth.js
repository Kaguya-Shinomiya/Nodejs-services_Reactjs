var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler');
let jwt = require('jsonwebtoken');
let constants = require('../utils/constants');
let { check_authentication } = require('../utils/check_auth');
let bcrypt = require('bcrypt');

/* Đăng nhập */
router.post('/login', async function (req, res, next) {
    try {
        //console.log("Login request received:", req.body);
        let { email, password } = req.body;
        let result = await userController.Login(email, password);
        if (!result) {
            //return CreateErrorRes(res, 400, "Invalid username or password");
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        let token = jwt.sign({
            id: result._id,
            expire: Math.floor(Date.now() / 1000) + 86400 // 1 ngày
        }, constants.SECRET_KEY);

        return CreateSuccessRes(res, 200, { token, user: result });
    } catch (error) {
        //next(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/* Đăng ký */
router.post('/signup', async function (req, res, next) {
    try {
        
        let { username, password, email } = req.body;

        // Kiểm tra username & email đã tồn tại chưa
        let existingUser = await userController.FindUser(username, email);
        if (existingUser) {
            return CreateErrorRes(res, 400, "Username or Email already exists");
        }

        
        let result = await userController.CreateAnUser(username, password, email, 'user');

        let token = jwt.sign({
            id: result._id,
            expire: Math.floor(Date.now() / 1000) + 86400
        }, constants.SECRET_KEY);

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

module.exports = router;
