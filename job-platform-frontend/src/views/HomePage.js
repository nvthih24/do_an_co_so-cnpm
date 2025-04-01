import React, { useState } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // Thêm dòng này

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
              <li className="navbar-menu__item tag-border">
                <a href="#" className="text-sm">
                  <i className="icon fa-regular fa-magnifying-glass"></i> Tìm
                  việc làm
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-buttons">
          <button className="button outline">Đăng nhập</button>
        </li>
        <li className="nav-buttons">
          <button
            className="button primary"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </li>
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredCategories.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredCategories.length) % filteredCategories.length
    );
  };

  return (
    <div className="job-categories">
      <h2>Danh mục công việc</h2>
      <input
        type="text"
        placeholder="Tìm danh mục công việc..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="category-search"
      />
      {filteredCategories.length > 0 ? (
        <div className="category-container">
          <button className="arrow-button left" onClick={handlePrev}>
            &#9665;
          </button>
          <div className="category-content">
            <h3>{filteredCategories[currentIndex].name}</h3>
            <ul>
              {filteredCategories[currentIndex].jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          </div>
          <button className="arrow-button right" onClick={handleNext}>
            &#9655;
          </button>
        </div>
      ) : (
        <p>Không tìm thấy danh mục phù hợp.</p>
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
        <JobList />
      </div>
    </div>
  );
};

export default HomePage;
