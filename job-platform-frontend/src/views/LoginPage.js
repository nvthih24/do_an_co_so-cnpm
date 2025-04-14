import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth(); // Lấy currentUser từ context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Kiểm tra xem currentUser có được cập nhật sau khi đăng nhập thành công
  useEffect(() => {
    console.log("useEffect chạy với currentUser:", currentUser);
    if (currentUser) {
      console.log("User is logged in:", currentUser); // Debug
      navigate("/"); // Nếu đã đăng nhập, chuyển hướng về trang chủ
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = response.data;
      console.log("API trả về user:", user);

      localStorage.setItem("token", token); // Lưu token vào localStorage
      login(user);  // Cập nhật currentUser trong AuthContext

      alert("Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng về trang chủ
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi đăng nhập!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await axios.post("http://localhost:5000/api/auth/google-login", {
        name: user.displayName,
        email: user.email,
        googleId: user.uid,
      });
      login({ name: user.displayName, email: user.email }); // Cập nhật currentUser sau khi đăng nhập thành công

      alert("Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng về trang chủ
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

        {/* Kiểm tra nếu currentUser không có thì hiển thị form đăng nhập */}
        {!currentUser ? (
          <>
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
          </>
        ) : (
          <div>
            <p>Chào, {currentUser.email}!</p>
            <button onClick={() => { login(null); localStorage.removeItem("token"); navigate("/"); }}>
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
