import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RecruiterRegister.css";


const RecruiterRegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/employer");
  };

  return (
    <div className="container">
      <h2>Đăng ký tài khoản Nhà tuyển dụng</h2>
      <form className="recruiter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email đăng nhập</label>
          <input type="email" placeholder="Nhập email công ty" required />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" placeholder="6 - 25 ký tự" required />
        </div>
        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input type="text" required />
        </div>
        <div className="form-group">  
          <label>Công ty</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Địa điểm làm việc</label>
          <input type="text" placeholder="TP.HCM, Hà Nội..." />
        </div>
        <button className="button primary_rrp" type="submit">Hoàn tất</button>
      </form>
    </div>
  );
};

export default RecruiterRegisterPage;
