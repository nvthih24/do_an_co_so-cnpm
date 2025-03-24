import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng ký thành công!", formData);
    navigate("/"); // Chuyển về trang chủ sau khi đăng ký
  };

  return (
    <div className="register-container">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Họ và tên" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="button primary">Đăng ký</button>
      </form>
      <button className="button google-btn">Đăng ký với Google</button>
      <p>Đã có tài khoản? <span onClick={() => navigate("/login")} className="link">Đăng nhập</span></p>
    </div>
  );
};

export default RegisterPage;
