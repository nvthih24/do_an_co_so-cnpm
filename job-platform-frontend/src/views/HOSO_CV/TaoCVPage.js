import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/createcv.css";
import { useAuth } from "../../contexts/AuthContext";
import RecruiterSelectionModal from "../RecruiterSelectionModal";
import cvTemplates from "./CvTemplate";

const TaoCVPage = () => {
  const navigate = useNavigate();
  const [cvTemplatesData, setCvTemplatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState("Tiếng Việt");
  const [design, setDesign] = useState("Tất cả thiết kế");
  const [status, setStatus] = useState("Được dùng nhiều nhất");

  const [languageOpen, setLanguageOpen] = useState(false);
  const [designOpen, setDesignOpen] = useState(false);

  useEffect(() => {
    setCvTemplatesData(cvTemplates); // Load data from local
    setLoading(false);
  }, []);

  const toggleLanguage = () => setLanguageOpen(!languageOpen);
  const toggleDesign = () => setDesignOpen(!designOpen);

  const handleSelectTemplate = (templateId) => {
    navigate(`/quan-ly-cv/${templateId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleJobClick = () => {
    if (!currentUser) {
      navigate("/login?redirect=/viec-lam-phu-hop"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    } else {
      navigate("/viec-lam-phu-hop"); // Điều hướng đến trang việc làm phù hợp nếu đã đăng nhập
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/viec-lam")}>
          {" "}
          <img src="/Job247.jpg" alt="Logo" />{" "}
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
            <a onClick={() => navigate("/mau-cv")}>Tạo CV</a>
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
            <button className="dropdown-btn" onClick={toggleDesign}>
              {design}{" "}
              <span className={`arrow ${designOpen ? "open" : ""}`}>▼</span>
            </button>
            {designOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-menu-btn"
                  onClick={() => setDesign("Tất cả thiết kế")}
                >
                  Tất cả thiết kế
                </button>
                <button
                  className="dropdown-menu-btn"
                  onClick={() => setDesign("Đơn giản")}
                >
                  Đơn giản
                </button>
                <button
                  className="dropdown-menu-btn"
                  onClick={() => setDesign("Sáng tạo")}
                >
                  Sáng tạo
                </button>
                <button
                  className="dropdown-menu-btn"
                  onClick={() => setDesign("Thanh lịch")}
                >
                  Thanh lịch
                </button>
                <button
                  className="dropdown-menu-btn"
                  onClick={() => setDesign("Kinh nghiệm")}
                >
                  Kinh nghiệm
                </button>
                <button
                  className="dropdown-menu-btn"
                  onClick={() => setDesign("Màu sắc")}
                >
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
            {cvTemplatesData.length === 0 ? (
              <p>Không có mẫu CV nào.</p>
            ) : (
              cvTemplatesData.map((template) => (
                <div
                  key={template.id}
                  className="cv-template-card"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="cv-template-img"
                  />
                  <h3 className="cv-template-title">{template.name}</h3>
                  <div className="cv-template-badges">
                    {template.badges?.map((badge, i) => (
                      <span key={i} className="cv-badge">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="cv-template-desc">{template.description}</p>
                  <button className="button-mau-cv">Chọn mẫu</button>
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
              <a title="cv là gì?" target="_blank" href="/cv-la-gi">
                CV là gì?
              </a>
              <a title="cách viết cv" target="_blank" href="/cach-viet-cv">
                Cách viết CV
              </a>
              <a title="cv xin việc là gì?" target="_blank" href="/cv-xin-viec">
                CV xin việc là gì?
              </a>
              <a title="cv xin việc mẫu" target="_blank" href="/mau-cv">
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
