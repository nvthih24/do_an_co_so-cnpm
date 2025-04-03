import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert(response.data.message);
      navigate("/login"); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi đăng ký!");
    }
  };

   // Xử lý đăng ký với Google
   const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Gửi thông tin user lên Backend để lưu vào MongoDB
      await axios.post("http://localhost:5000/api/auth/google", {
        name: user.displayName,
        email: user.email,
        googleId: user.uid,
      });

      alert("Đăng ký thành công!");
      navigate("/"); // Chuyển hướng về trang chủ
    } catch (error) {
      setError("Lỗi đăng ký với Google!");
    }
  };


  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Đăng ký tài khoản</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <button type="submit" className="button primary">
            Đăng ký
          </button>
        </form>
        <button className="button google-btn" onClick={handleGoogleSignIn}>
          Đăng ký với Google
        </button>
        <p>
          Đã có tài khoản?{" "}
          <span onClick={() => navigate("/login")} className="link">
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
