import React, { useState } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RecruiterSelectionModal from "../views/RecruiterSelectionModal";


const jobCategoriesData = [
  {
    name: "Kinh doanh/Bán hàng",
    jobs: ["Sales Executive", "Account Manager", "Sales Assistant", "Business Development", "Retail Manager", "Marketing Sales"],
  },
  {
    name: "Marketing/PR/Quảng cáo",
    jobs: ["Digital Marketing", "PR Executive", "Brand Manager", "SEO Specialist", "Content Creator", "Social Media Manager"],
  },
  {
    name: "Chăm sóc khách hàng",
    jobs: ["Customer Support", "Call Center Agent", "Help Desk", "Technical Support", "Client Service Manager", "Customer Relations"],
  },
  {
    name: "Nhân sự/Hành chính/Pháp chế",
    jobs: ["HR Manager", "Recruitment Specialist", "Payroll Officer", "Legal Advisor", "Office Admin", "Corporate Lawyer"],
  },
  {
    name: "Tài chính/Ngân hàng/Bảo hiểm",
    jobs: ["Bank Teller", "Financial Analyst", "Investment Advisor", "Loan Officer", "Insurance Agent", "Accountant"],
  },
  {
    name: "Công nghệ Thông tin",
    jobs: ["Software Developer", "Data Analyst", "Cyber Security", "Cloud Engineer", "IT Support", "AI Engineer"],
  },
];

// Mock danh sách việc làm để hiển thị
const allJobs = [
  { title: "Nhân viên kinh doanh", company: "Công ty ABC", location: "Hà Nội", salary: "12-15 triệu" },
  { title: "Digital Marketing", company: "Công ty XYZ", location: "TP.HCM", salary: "15-20 triệu" },
  { title: "Data Analyst", company: "DataTech", location: "Đà Nẵng", salary: "18-22 triệu" },
  { title: "Nhân viên chăm sóc khách hàng", company: "SupportCo", location: "Hà Nội", salary: "10-12 triệu" },
  { title: "Brand Manager", company: "BrandHouse", location: "TP.HCM", salary: "25-30 triệu" },
  { title: "IT Support", company: "TechCare", location: "Cần Thơ", salary: "14-16 triệu" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = jobCategoriesData.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

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
                <li><a onClick={() => navigate("/find-jobs")}>Tìm việc làm</a></li>
                <li><a onClick={() => navigate("/viec-lam-phu-hop")}>Việc làm phù hợp</a></li>
                <li><a onClick={() => navigate("/it-jobs")}>Việc làm IT</a></li>
                <li><a onClick={() => navigate("/senior-jobs")}>Việc làm Senior</a></li>
                <li><a onClick={() => navigate("/company-list")}>Danh sách công ty</a></li>
                <li><a onClick={() => navigate("/top-company")}>Top công ty</a></li>
              </ul>
            </div>
          </li>
          <li className="navbar-left__item group">
            <a onClick={() => navigate("/ho-so-cv")}>Hồ sơ & CV</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li><a onClick={() => navigate("/tao-cv")}>Tạo CV</a></li>
                <li><a onClick={() => navigate("/tu-van-cv")}>Dịch vụ tư vấn CV</a></li>
                <li><a onClick={() => navigate("/your-cv")}>Hồ sơ của tôi</a></li>
              </ul>
            </div>
          </li>
          <li className="navbar-left__item group">
            <a onClick={() => navigate("/cong-cu")}>Công cụ</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li><a onClick={() => navigate("/cv-skill")}>CV Skills</a></li>
                <li><a onClick={() => navigate("/thue-tncn")}>Tính thuế TNCN</a></li>
                <li><a onClick={() => navigate("/tinh-baohiem")}>Tính bảo hiểm</a></li>
                <li><a onClick={() => navigate("/tinh-luong")}>Tính lương</a></li>
                <li><a onClick={() => navigate("/tinh-lai-kep")}>Tính lãi suất kép</a></li>
                <li><a onClick={() => navigate("/ke-hoach-tiet-kiem")}>Lập kế hoạch tiết kiệm</a></li>
              </ul>
            </div>
          </li>
          <li className="navbar-left__item group">
            <a onClick={() => navigate("/cam-nang")}>Cẩm nang nghề nghiệp</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li><a onClick={() => navigate("/tu-van-nghe-nghiep")}>Tư vấn nghề nghiệp</a></li>
                <li><a onClick={() => navigate("/thi-truong-va-xu-huong")}>Thị trường & xu hướng</a></li>
                <li><a onClick={() => navigate("/che-do-luong")}>Chế độ lương thưởng</a></li>
                <li><a onClick={() => navigate("/bi-quyet-tim-viec")}>Bí quyết tìm việc</a></li>
                <li><a onClick={() => navigate("/kien-thuc-chuyen-nganh")}>Kiến thức chuyên ngành</a></li>
                <li><a onClick={() => navigate("/hanh-trang-nghe-nghiep")}>Hành trang nghề nghiệp</a></li>
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
        <ul className="nav navbar-nav navbar-right">
          {!currentUser ? (
            <>
              <li><button className="button outline" onClick={() => navigate("/login")}>Đăng nhập</button></li>
              <li><button className="button primary" onClick={() => navigate("/register")}>Đăng ký</button></li>
            </>
          ) : (
            <>
              <li><span>Xin chào, {currentUser.name}</span></li>
              <li><button className="button outline" onClick={logout}>Đăng xuất</button></li>
            </>
          )}
          <li>
            <button className="button secondary" onClick={() => setShowModal(true)}>
              Đăng tuyển & tìm hồ sơ
            </button>
          </li>
        </ul>
      </div>

      {showModal && <RecruiterSelectionModal onClose={() => setShowModal(false)} />}

      <div className="search-bar">
        <input type="text" placeholder="Vị trí tuyển dụng, tên công ty" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
        <input type="text" placeholder="Địa điểm" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
        <button className="button primary">Tìm kiếm</button>
      </div>

      <div className="content">
        <div className="job-categories">
          <div className="category-container">
            <div className="category-content">
              <h3>{jobCategoriesData[currentIndex].name}</h3>
              <ul>
                {jobCategoriesData[currentIndex].jobs.map((job, index) => (
                  <li key={index}>{job}</li>
                ))}
              </ul>
            </div>
            <div className="category-page-number">
              <span>{currentIndex + 1} / {totalPages}</span>
            </div>
            <div className="category-buttons">
              <button className="arrow-button left" onClick={handlePrev}>&#9665;</button>
              <button className="arrow-button right" onClick={handleNext}>&#9655;</button>
            </div>
          </div>
        </div>
      </div>

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
      <div className="content">
        <div className="job-list">
          <h2>Việc làm tốt nhất</h2>
          <div className="job-grid">
            {filteredJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <p className="company">{job.company} - {job.location}</p>
                <div className="job-footer">
                  <p className="salary">{job.salary}</p>
                  <button className="button outline">Ứng tuyển</button>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && <p>Không tìm thấy việc làm phù hợp.</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
