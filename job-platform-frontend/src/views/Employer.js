import React, { useState } from "react";
import "../styles/employer_.css";
import { useAuth } from "../contexts/AuthContext"; // Import context
import JobPostForm from "../views/JobPostForm";
import { useNavigate } from "react-router-dom";
import RecruiterSelectionModal from "../views/RecruiterSelectionModal";

const Employer = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth(); // Lấy người dùng hiện tại
  const [showModal, setShowModal] = useState(false);

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
      <div className="dashboard">
        <aside className="sidebar">
          <div className="profile">
            <h3>{currentUser?.name || "Người dùng"}</h3>{" "}
            {/* Hiển thị tên đăng nhập */}
            <p>Employer</p>
          </div>
        </aside>

        <main className="content-employer">
          <h2>Xin chào, {currentUser?.name || "Người dùng"}</h2>
          <ul className="verify-list">
            <JobPostForm />
            <div className="body-employer">
              <li onClick={() => alert("Xác thực số điện thoại")}>
                Xác thực số điện thoại
                <span className="arrow">&rarr;</span>
              </li>
              <li onClick={() => alert("Cập nhật thông tin công ty")}>
                Cập nhật thông tin công ty
                <span className="arrow">&rarr;</span>
              </li>
              <li onClick={() => alert("Cập nhật giấy phép kinh doanh")}>
                Cập nhật giấy phép kinh doanh
                <span className="arrow">&rarr;</span>
              </li>
            </div>
          </ul>

          {/* Thêm form chi tiết công việc */}
        </main>
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

export default Employer;
