import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/auth/forgot-password", { email });
      alert("OTP đã được gửi về email!");
      setStep(2);
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
      alert(error.response?.data?.message || "Không thể gửi OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post("http://localhost:5000/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
      navigate("/login"); // 👉 Điều hướng về trang đăng nhập
    } catch (error) {
      console.error("Lỗi đặt lại mật khẩu:", error);
      alert(error.response?.data?.message || "OTP không hợp lệ hoặc đã hết hạn");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      {step === 1 ? (
        <>
          <h2 className="text-xl font-bold mb-4">Quên mật khẩu</h2>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded"
            onClick={handleSendOtp}
          >
            Gửi mã OTP
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Nhập OTP & mật khẩu mới</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="w-full bg-green-500 text-white py-2 rounded"
            onClick={handleResetPassword}
          >
            Xác nhận
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
