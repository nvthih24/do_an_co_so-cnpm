import React, { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import axios from 'axios';

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);  // Step 1: Email, Step 2: OTP, Step 3: Reset password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) return showToast("Please enter your email", "error");

    setLoading(true);
    try {
      await axios.post('/api/forgot-password/send-otp', { email });
      console.log("OTP sent to email");
      showToast("Check your email for the reset code", "success");
      setStep(2);
    } catch (err: any) {
      showToast(err.response?.data?.message || "Failed to send OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return showToast("Please enter the OTP", "error");

    setLoading(true);
    try {
      await axios.post('/api/forgot-password/verify-otp', { email, otp });
      setStep(3);
    } catch (err: any) {
      showToast(err.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) return showToast("Passwords do not match", "error");

    setLoading(true);
    try {
      await axios.post('/api/forgot-password/reset-password', { email, newPassword });
      showToast("Password reset successfully!", "success");
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err.response?.data?.message || "Failed to reset password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 shadow rounded-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot your password?</h2>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              disabled={loading}
              onClick={sendOtp}
              className="w-full btn btn-primary text-black border-t border-gray-300 hover:bg-gray-100"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
            <div className="mt-4 text-center">
              <span onClick={() => window.location.href = "/login"} className="text-sm text-blue-500 cursor-pointer">Back to Login</span>
            </div>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="form-input w-full mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              disabled={loading}
              onClick={verifyOtp}
              className="w-full btn btn-primary text-black border-t border-gray-300 hover:bg-gray-100"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="mt-4 text-center">
              <span onClick={() => setStep(1)} className="text-sm text-blue-500 cursor-pointer">Back to Email</span>
            </div>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="form-input w-full mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="form-input w-full mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              disabled={loading}
              onClick={resetPassword}
              className="w-full btn btn-primary text-black border-t border-gray-300 hover:bg-gray-100"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <div className="mt-4 text-center">
              <span onClick={() => window.location.href = "/login"} className="text-sm text-blue-500 cursor-pointer">Back to Login</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
