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
    const role = localStorage.getItem("role");
  
    if (currentUser) {
      if (role === "admin") {
        navigate("/admin/job-approval");
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user } = response.data;
      console.log("API trả về user:", user);
      console.log("user.role:", user.role);

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role); // Lưu token vào localStorage

      login(user); // Cập nhật currentUser trong AuthContext

      alert("Đăng nhập thành công!");
      if (user.role === "admin") {
        navigate("/admin/job-approval");
      } else {
        navigate("/");
      }    } catch (error) {
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

  const handleFacebookSignIn = () => {
    console.log("Đăng nhập với Facebook");
  };

  const handleGithubSignIn = () => {
    console.log("Đăng nhập với GitHub");
  };

  const handleLinkedInSignIn = () => {
    console.log("Đăng nhập với LinkedIn");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="welcome-title">Đăng nhập tài khoản</h2>
        {error && <p className="error">{error}</p>}

        {/* Kiểm tra nếu currentUser không có thì hiển thị form đăng nhập */}
        {!currentUser ? (
          <>
            <div className="social-login">
              <button
                className="social-btn google"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google Icon"
                />
              </button>
              <button
                className="social-btn facebook"
                onClick={handleFacebookSignIn}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png"
                  alt="Facebook Icon"
                />
              </button>
              <button
                className="social-btn github"
                onClick={handleGithubSignIn}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="Github Icon"
                />
              </button>
              <button
                className="social-btn linkedin"
                onClick={handleLinkedInSignIn}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
                  alt="LinkedIn Icon"
                />
              </button>
            </div>
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
              <button type="submit" className="button primary_login">
                Đăng nhập
              </button>
            </form>

            <p>
              Chưa có tài khoản?{" "}
              <span onClick={() => navigate("/register")} className="link">
                Đăng ký ngay
              </span>
            </p>
            <p>
              <span
                onClick={() => navigate("/forgot-password")}
                className="link"
              >
                Quên mật khẩu?
              </span>
            </p>
          </>
        ) : (
          <div>
            <p>Chào, {currentUser.email}!</p>
            <button
              onClick={() => {
                login(null);
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
