import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/createcv.css";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import RecruiterSelectionModal from "../RecruiterSelectionModal";

const TaoCVPage = () => {
  const navigate = useNavigate();
  const [cvTemplates, setCvTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState("Tiếng Việt");
  const [design, setDesign] = useState("Tất cả thiết kế");
  const [status, setStatus] = useState("Được dùng nhiều nhất");

  const [languageOpen, setLanguageOpen] = useState(false);
  const [designOpen, setDesignOpen] = useState(false);

  useEffect(() => {
    const fetchCVTemplates = async () => {
      try {
        const response = await axios.get("");
        setCvTemplates(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách mẫu CV:", error);
        setLoading(false);
      }
    };
    fetchCVTemplates();
  }, []);

  // Handle dropdown toggle for language
  const toggleLanguage = () => setLanguageOpen(!languageOpen);

  // Handle dropdown toggle for design
  const toggleDesign = () => setDesignOpen(!designOpen);

  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleDesignChange = (e) => setDesign(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleSelectTemplate = (templateId) => {
    navigate(`/quan-ly-cv/${templateId}`);
  };

  const handleJobClick = () => {
    if (!currentUser) {
      navigate("/login?redirect=/viec-lam-phu-hop"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    } else {
      navigate("/viec-lam-phu-hop"); // Điều hướng đến trang việc làm phù hợp nếu đã đăng nhập
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/viec-lam")}>
          <img src="/Job247.jpg" alt="Logo" />
        </div>
        <ul className="nav navbar-nav navbar-left">
          <div className="navbar-left__item group">
            <a onClick={() => navigate("/viec-lam")}>Việc làm</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/viec-lam")}>Tìm việc làm</a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => handleJobClick("/viec-lam-phu-hop")}>
                    Việc làm phù hợp
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/company-list")}>
                    Danh sách công ty
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/top-company")}>Top công ty</a>
                </li>
              </ul>
            </div>
          </div>
          <li className="navbar-left__item group">
            <a onClick={() => navigate("/tao-cv")}>Tạo CV</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/quan-ly-cv")}>Quản lý CV</a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/huong-dan-viet-cv")}>
                    Hướng dẫn viết CV
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/your-cv")}>Hồ sơ của tôi</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="navbar-left__item group">
            <a onClick={() => navigate("#")}>Công cụ</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/thue-tncn")}>Tính thuế TNCN</a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/tinh-bao-hiem-that-nghiep")}>
                    Tính bảo hiểm thất nghiệp
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/tinh-luong")}>Tính lương</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="navbar-left__item group">
            <a onClick={() => navigate("/cam-nang")}>Cẩm nang nghề nghiệp</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/tu-van-nghe-nghiep")}>
                    Tư vấn nghề nghiệp
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/thi-truong-va-xu-huong")}>
                    Thị trường & xu hướng
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/che-do-luong")}>
                    Chế độ lương thưởng
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/bi-quyet-tim-viec")}>
                    Bí quyết tìm việc
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/kien-thuc-chuyen-nganh")}>
                    Kiến thức chuyên ngành
                  </a>
                </li>
                <li className="navbar-menu__item">
                  <a onClick={() => navigate("/hanh-trang-nghe-nghiep")}>
                    Hành trang nghề nghiệp
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {!currentUser ? (
            <>
              <li key="login">
                <button
                  className="button outline"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
              </li>
              <li key="register">
                <button
                  className="button primary"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </button>
              </li>
            </>
          ) : (
            <>
              <li key="greeting">
                <span className="user-greeting">
                  Xin chào, {currentUser.name}
                </span>
              </li>
              <li key="logout">
                <button className="button outline" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="button secondary"
              onClick={() => setShowModal(true)}
            >
              Đăng tuyển & tìm hồ sơ
            </button>
          </li>
        </ul>
      </div>
      {showModal && (
        <RecruiterSelectionModal onClose={() => setShowModal(false)} />
      )}
      <div className="create-cv-page">
        <h2>Mẫu CV xin việc tiếng Việt, Anh, Nhật chuẩn 2025</h2>
        <p>
          Chọn mẫu CV phù hợp với bạn và bắt đầu tạo CV xin việc chuyên nghiệp
          ngay hôm nay. Bạn có thể chỉnh sửa thông tin cá nhân, kinh nghiệm làm
          việc, học vấn và kỹ năng của mình để tạo ra một CV độc đáo và ấn
          tượng.
        </p>
        <div className="dropdown-container">
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleLanguage}>
              {language}{" "}
              <span className={`arrow ${languageOpen ? "open" : ""}`}>▼</span>{" "}
            </button>
            {languageOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleLanguageChange("Tiếng Việt")}>
                  Tiếng Việt
                </button>
                <button onClick={() => handleLanguageChange("English")}>
                  English
                </button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDesign}>
              {design}{" "}
              <span className={`arrow ${designOpen ? "open" : ""}`}>▼</span>
            </button>
            {designOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleDesignChange("Tất cả thiết kế")}>
                  Tất cả thiết kế
                </button>
                <button onClick={() => handleDesignChange("Đơn giản")}>
                  Đơn giản
                </button>
                <button onClick={() => handleDesignChange("Sáng tạo")}>
                  Sáng tạo
                </button>
                <button onClick={() => handleDesignChange("Thanh lịch")}>
                  Thanh lịch
                </button>
                <button onClick={() => handleDesignChange("Kinh nghiệm")}>
                  Kinh nghiệm
                </button>
                <button onClick={() => handleDesignChange("Màu sắc")}>
                  Màu sắc
                </button>
              </div>
            )}
          </div>

          <div className="status-container">
            <label className="status-option">
              <input
                type="radio"
                name="status"
                value="Mới cập nhật"
                checked={status === "Mới cập nhật"}
                onChange={() => setStatus("Mới cập nhật")}
              />
              <span className="status-label">Mới cập nhật</span>
            </label>
            <label className="status-option">
              <input
                type="radio"
                name="status"
                value="Được dùng nhiều nhất"
                checked={status === "Được dùng nhiều nhất"}
                onChange={() => setStatus("Được dùng nhiều nhất")}
              />
              <span className="status-label">Được dùng nhiều nhất</span>
            </label>
          </div>
        </div>
        {loading ? (
          <p>Đang tải các mẫu CV...</p>
        ) : (
          <div className="cv-templates">
            {cvTemplates.length === 0 ? (
              <p>Không có mẫu CV nào.</p>
            ) : (
              cvTemplates.map((template) => (
                <div
                  key={template.id}
                  className="cv-template-card"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="cv-template-image"
                  />
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <button className="button">Chọn mẫu</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <footer id="footer-desktop">
        <div className="footer-common-search-keywords">
          <div className="footer-common-search-keywords">
            <div className="container-keyword-seo">
              <a title="cv là gì?" target="_blank" href="#">
                CV là gì?
              </a>
              <a title="cách viết cv" target="_blank" href="#">
                Cách viết CV
              </a>
              <a title="cv xin việc" target="_blank" href="#">
                CV xin việc
              </a>
              <a title="cv xin việc là gì?" target="_blank" href="#">
                CV xin việc là gì?
              </a>
              <a title="cv xin việc mẫu" target="_blank" href="#">
                CV xin việc mẫu
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default TaoCVPage;
