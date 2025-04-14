import React, { useState } from 'react';
import axios from 'axios';
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post('/api/forgot-password/send-otp', { email });
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi gửi mã OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('/api/forgot-password/verify-otp', { email, otp });
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Mã OTP không hợp lệ");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) return alert("Mật khẩu không khớp!");
    try {
      await axios.post('/api/forgot-password/reset-password', { email, newPassword });
      alert("Đổi mật khẩu thành công!");
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert("Lỗi khi đổi mật khẩu!");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Tạo lại mật khẩu</button>

          <div className="links">
            <span className="link" onClick={() => window.location.href = "/login"}>
              Quay lại đăng nhập
            </span>
            <span className="link" onClick={() => window.location.href = "/register"}>
              Đăng ký tài khoản mới
            </span>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Nhập mã xác nhận"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Xác minh</button>

          <div className="links">
            <span className="link" onClick={() => setStep(1)}>
              Quay lại nhập email
            </span>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Đổi mật khẩu</button>

          <div className="links">
            <span className="link" onClick={() => setStep(1)}>
              Quay lại đăng nhập
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
