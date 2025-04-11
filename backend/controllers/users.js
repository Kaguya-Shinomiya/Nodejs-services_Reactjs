var userSchema = require('../schemas/user')
var roleController = require('../controllers/roles')
let bcrypt = require('bcrypt')
const sendEmail = require('../utils/sendEmail');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

module.exports = {
    GetAllUser: async () => {
        return await userSchema.find({}).populate('role');
    },
    GetUserById: async (id) => {
        return await userSchema.findById(id).populate('role');
    },
    CreateAnUser: async (username, password, email, fullName, address, role) => {
        let GetRole = await roleController.GetRoleByName(role);
        if (GetRole) {
            newUser = new userSchema({
                username: username,
                password: password,
                email: email,
                fullName: fullName,
                address: address,
                status: true,
                role: GetRole._id
            })
            return await newUser.save();
        } else {
            throw new Error("role sai heheeheheh");
        }
    },
    UpdateUser: async function (id, body) {
        let GetRole = await roleController.GetRoleById(body.role);
        let allowFields = ["username", "email", "fullName", "address"];
        let user = await userSchema.findById(id);
        if (GetRole) {
            if (user) {
                for (const key of Object.keys(body)) {
                    if (allowFields.includes(key)) {
                        user[key] = body[key]
                    }
                }
                user.role = GetRole._id;
                user.status = true;
                return await user.save();
            }
        } else {
            throw new Error("role sai heheeheheh");
        }

    },
    DeleteUser: async function (id) {
        let user = await userSchema.findById(id);
        if (user) {
            user.status = false;
            return await user.save();
        }
    },
    Login: async function (email, password) {
        let user = await userSchema.findOne({
            email: email
        })
        if (!user) {
            throw new Error("username hoac mat khau khong dung")
        } 
        if(user.status == false){
            throw new Error("Tài khoản đã bị khóa")
        }
        
        else {
            if (bcrypt.compareSync(password, user.password)) {
                user.loginCount+=1;
                user.save();
                return user.populate({ path: "role", select: "name" });
            } else {
                throw new Error("username hoac mat khau khong dung")
            }
        }

    },
    FindUser: async function (username, password) {
        return await userSchema.findOne({
            username: username
        })
    },
    ResetPasswordUser: async (id) => {
        const user = await userSchema.findById(id);
        if (!user) throw new Error("Không tìm thấy user");
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash("000000", salt);
    
        return await user.save();
    },
    RequestPasswordReset: async (email) => {
        const user = await userSchema.findOne({ email });
        if (!user) throw new Error("Email không tồn tại");

        const otp = generateOTP();
        const expires = new Date(Date.now() + 5 * 60 * 1000);

        user.otp = otp;
        user.otpExpires = expires;
        await user.save();

        const message = `Mã OTP của bạn là: ${otp}. Có hiệu lực trong 5 phút.`;
        await sendEmail(user.email, "Mã OTP đặt lại mật khẩu", message);
        return true;
    },
    VerifyOTP: async (email, otp) => {
        const user = await userSchema.findOne({ email });
        if (!user) throw new Error("Email không tồn tại");
        if (user.otp !== otp) throw new Error("OTP không đúng");
        if (user.otpExpires < new Date()) throw new Error("OTP đã hết hạn");

        user.otp = null;
        user.otpExpires = null;
        await user.save();
        return user;
    },
    ResetPasswordWithOTP: async (email, otp, newPassword) => {
        const user = await userSchema.findOne({ email });
        if (!user) throw new Error("Email không tồn tại");
    
        if (user.otp !== otp) throw new Error("OTP không đúng");
        if (!user.otpExpires || user.otpExpires < new Date()) throw new Error("OTP đã hết hạn");
    
        user.password = newPassword;
    

        user.otp = null;
        user.otpExpires = null;
    
        await user.save();
        return true;
    }
};
