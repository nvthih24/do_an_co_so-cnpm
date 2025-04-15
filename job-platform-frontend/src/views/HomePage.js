import React, { useState } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const jobCategoriesData = [
  {
    name: "Kinh doanh/Bán hàng",
    jobs: [
      "Sales Executive",
      "Account Manager",
      "Sales Assistant",
      "Business Development",
      "Retail Manager",
      "Marketing Sales",
    ],
  },
  {
    name: "Marketing/PR/Quảng cáo",
    jobs: [
      "Digital Marketing",
      "PR Executive",
      "Brand Manager",
      "SEO Specialist",
      "Content Creator",
      "Social Media Manager",
    ],
  },
  {
    name: "Chăm sóc khách hàng",
    jobs: [
      "Customer Support",
      "Call Center Agent",
      "Help Desk",
      "Technical Support",
      "Client Service Manager",
      "Customer Relations",
    ],
  },
  {
    name: "Nhân sự/Hành chính/Pháp chế",
    jobs: [
      "HR Manager",
      "Recruitment Specialist",
      "Payroll Officer",
      "Legal Advisor",
      "Office Admin",
      "Corporate Lawyer",
    ],
  },
  {
    name: "Tài chính/Ngân hàng/Bảo hiểm",
    jobs: [
      "Bank Teller",
      "Financial Analyst",
      "Investment Advisor",
      "Loan Officer",
      "Insurance Agent",
      "Accountant",
    ],
  },
  {
    name: "Công nghệ Thông tin",
    jobs: [
      "Software Developer",
      "Data Analyst",
      "Cyber Security",
      "Cloud Engineer",
      "IT Support",
      "AI Engineer",
    ],
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/Job247.jpg" alt="Logo" />
      </div>

      <ul className="nav navbar-nav navbar-left">
        <li className="navbar-left__item group">
          <a href="#">Việc làm</a>
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
          <a href="#">Hồ sơ & CV</a>
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
          <a href="#">Công cụ</a>
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
          <a href="#">Cẩm nang nghề nghiệp</a>
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
          <button className="button secondary">Đăng tuyển & tìm hồ sơ</button>
        </li>
      </ul>
    </div>
  );
};

const SearchBar = () => (
  <div className="search-bar">
    <input type="text" placeholder="Vị trí tuyển dụng, tên công ty" />
    <input type="text" placeholder="Địa điểm" />
    <button className="button primary">Tìm kiếm</button>
  </div>
);

const JobCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = jobCategoriesData.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobCategoriesData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + jobCategoriesData.length) % jobCategoriesData.length
    );
  };

  const totalPages = filteredCategories.length; // Tổng số trang

  return (
    <div className="job-categories">
      {jobCategoriesData.length > 0 && (
        <div className="category-container">
          <div className="category-content">
            <h3>{jobCategoriesData[currentIndex].name}</h3>
            <ul>
              {jobCategoriesData[currentIndex].jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          </div>

          {/* Phần chứa số trang */}
          <div className="category-page-number">
            <span className="page-number">
              {currentIndex + 1} / {totalPages} {/* Hiển thị số trang */}
            </span>
          </div>

          {/* Phần chứa các nút mũi tên */}
          <div className="category-buttons">
            <button className="arrow-button left" onClick={handlePrev}>
              &#9665; {/* Mũi tên trái */}
            </button>
            <button className="arrow-button right" onClick={handleNext}>
              &#9655; {/* Mũi tên phải */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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
        <JobCategories />
      </div>
      <div className="content">
        <JobList />
      </div>
    </div>
  );
};

export default HomePage;
