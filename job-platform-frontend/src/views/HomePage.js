import React, { useState } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RecruiterSelectionModal from "../views/RecruiterSelectionModal";


const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false); 

  return (
    <>
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/Job247.jpg" alt="Logo" />
      </div>

      <ul className="nav navbar-nav navbar-left">
        <li className="navbar-left__item group">
        <a className="text-sm" onClick={() => navigate("/viec-lam")}>Việc làm</a>
          <div className="navbar__item__dropdown-menu">
            <ul className="navbar-menu">
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/find-jobs")}>
                  Tìm việc làm
                </a>
              </li>
              <li className="navbar-menu__item">
              <a className="text-sm" onClick={() => navigate("/viec-lam-phu-hop")}>
                  Việc làm phù hợp
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/it-jobs")}>
                  Việc làm IT
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/senior-jobs")}>
                  Việc làm Senior
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/company-list")}>
                  Danh sách công ty
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/top-company")}>
                  Top công ty
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="navbar-left__item group">
        <a className="text-sm" onClick={() => navigate("/ho-so-cv")}>Hồ sơ & CV</a>
          <div className="navbar__item__dropdown-menu">
            <ul className="navbar-menu">
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/tao-cv")}>
                  Tạo CV
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/tu-van-cv")}>
                  Dịch vụ tư vấn CV
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/your-cv")}>
                  Hồ sơ của tôi
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="navbar-left__item group">
        <a className="text-sm" onClick={() => navigate("/cong-cu")}>Công cụ</a>
          <div className="navbar__item__dropdown-menu">
            <ul className="navbar-menu">
              <li className="navbar-menu__item">
              <a className="text-sm" onClick={() => navigate("/cv-skill")}>
                  CV Skills
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/thue-tncn")}>
                  Tính thuế TNCN
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/tinh-baohiem")}>
                  Tính bảo hiểm
                </a>
              </li>
              <li className="navbar-menu__item">
              <a className="text-sm" onClick={() => navigate("/tinh-luong")}>
                  Tính lương
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/tinh-lai-kep")}>
                  Tính lãi suất kép
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/ke-hoach-tiet-kiem")}>
                  Lập kế hoạch tiết kiệm
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="navbar-left__item group">
        <a className="text-sm" onClick={() => navigate("/cam-nang")}>Cẩm nang nghề nghiệp</a>
          <div className="navbar__item__dropdown-menu">
            <ul className="navbar-menu">
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/tu-van-nghe-nghiep")}>
                  Tư vấn nghề nghiệp
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/thi-truong-va-xu-huong")}>
                  Thị trường và xu hướng ngành nghề
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/che-do-luong")}>
                  Chế độ lương thưởng
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/bi-quyet-tim-viec")}>
                  Bí quyết tìm việc
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/kien-thuc-chuyen-nganh")}>
                  Kiến thức chuyên ngành
                </a>
              </li>
              <li className="navbar-menu__item">
                <a className="text-sm" onClick={() => navigate("/hanh-trang-nghe-nghiep")}>
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
            <li className="nav-buttons">
              <button className="button outline" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
            </li>
            <li className="nav-buttons">
              <button className="button primary" onClick={() => navigate("/register")}>
                Đăng ký
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-buttons">
              <span>Xin chào, {currentUser.name}</span>
            </li>
            <li className="nav-buttons">
              <button className="button outline" onClick={logout}>
                Đăng xuất
              </button>
            </li>
          </>
        )}
        <li className="nav-buttons">
          <button className="button secondary" onClick={() => setShowModal(true)}>Đăng tuyển & tìm hồ sơ</button>
        </li>
      </ul>
    </div>
    {showModal && (
        <RecruiterSelectionModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

const SearchBar = () => (
  <div className="search-bar">
    <input type="text" placeholder="Vị trí tuyển dụng, tên công ty" />
    <input type="text" placeholder="Địa điểm" />
    <button className="button primary">Tìm kiếm</button>
  </div>
);

const JobList = () => (
  <div className="job-list">
    <h2>Việc làm tốt nhất</h2>
    <div className="job-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="job-card">
          <h3>Nhân viên kinh doanh</h3>
          <p className="company">Công ty ABC - Hà Nội</p>
          <div className="job-footer">
            <p className="salary">12-15 triệu</p>
            <button className="button outline">Ứng tuyển</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  console.log("HomePage Rendered");
  return (
    <div className="container">
      <Navbar />
      <SearchBar />
      <div className="content">
        <JobList />
      </div>
    </div>
  );
};

export default HomePage;
