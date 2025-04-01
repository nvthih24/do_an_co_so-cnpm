import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
        "http://localhost:3000/register",
        formData
      );
      alert(response.data.message);
      navigate("/login"); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi đăng ký!");
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
        <button className="button google-btn">Đăng ký với Google</button>
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
