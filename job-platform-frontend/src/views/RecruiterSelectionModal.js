import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RecruiterModal.css";


const RecruiterSelectionModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleRecruiterClick = () => {
    navigate("/dang-ky-nha-tuyen-dung");
  };

  const handleCandidateClick = () => {
    navigate("/");
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Chào bạn,</h3>
        <p>Hãy chọn nhóm phù hợp với bạn để tiếp tục:</p>
        <div className="options">
          <div className="option-card" onClick={handleRecruiterClick}>
            <img src="/z6508146658648_769ba18beb10344374dc4530dcb873b4.jpg" alt="Nhà tuyển dụng" />
            <button className="button primary">Tôi là nhà tuyển dụng</button>
          </div>
          <div className="option-card" onClick={handleCandidateClick}>
            <img src="/z6508152856718_352b817abc8b8b5f96adbeb07c9ba355.jpg" alt="Ứng viên" />
            <button className="button secondary">Tôi là ứng viên tìm việc</button>
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default RecruiterSelectionModal;
