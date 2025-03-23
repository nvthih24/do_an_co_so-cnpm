import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // 👈 Import useNavigate

const Register = () => {
    const navigate = useNavigate();  // 👈 Hook để điều hướng

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            alert("Đăng ký thành công!");
            navigate("/");  // 👈 Điều hướng đúng cách trong React Router
        } catch (error) {
            console.error(error.response?.data?.message || "Lỗi đăng ký!");
            alert("Đăng ký thất bại!");
        }
    };

    return (
        <div className="register-container">
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Tên đăng nhập" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
