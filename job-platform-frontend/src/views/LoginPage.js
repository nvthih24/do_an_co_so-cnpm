import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig"; // Import Firebase
import "../styles/LoginPage.css"; // Đảm bảo có CSS

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Xử lý thay đổi dữ liệu nhập vào form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý đăng nhập bằng Email & Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Đăng nhập thành công!");
      navigate("/"); 
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi đăng nhập!");
    }
  };

  // Xử lý đăng nhập với Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Gửi thông tin user lên Backend để xác thực và lưu vào database
      await axios.post("http://localhost:5000/api/auth/google-login", {
        name: user.displayName,
        email: user.email,
        googleId: user.uid,
      });

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      setError("Lỗi đăng nhập với Google!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="home-button" onClick={() => navigate("/")}>
          <img src="/Job247.jpg" alt="Logo" className="logo-img" />
        </button>
        <h2 className="welcome-title">Chào mừng bạn đã quay trở lại</h2>
        <p className="welcome-subtitle">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
        </p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="button primary">Đăng nhập</button>
        </form>
        <button className="button google-btn" onClick={handleGoogleSignIn}>
          Đăng nhập với Google  
        </button>
        <p>
          Chưa có tài khoản?{" "}
          <span onClick={() => navigate("/register")} className="link">Đăng ký ngay</span>
        </p>
        <p>
          <span onClick={() => navigate("/forgot-password")} className="link">Quên mật khẩu?</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;