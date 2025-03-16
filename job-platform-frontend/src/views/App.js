import React from "react";
import '../styles/global.css';

const Navbar = () => (
  <div className="navbar">
    <h1>3TML</h1>
    <div className="nav-buttons">
      <button className="button outline">Đăng nhập</button>
      <button className="button primary">Đăng ký</button>
      <button className="button secondary">Đăng tuyển & tìm hồ sơ</button>
    </div>
  </div>
);

const SearchBar = () => (
  <div className="search-bar">
    <input type="text" placeholder="Vị trí tuyển dụng, tên công ty" />
    <input type="text" placeholder="Địa điểm" />
    <button className="button primary">Tìm kiếm</button>
  </div>
);

const JobCategories = () => (
  <div className="job-categories">
    <h2>Danh mục công việc</h2>
    <ul>
      {[
        "Kinh doanh/Bán hàng",
        "Marketing/PR/Quảng cáo",
        "Chăm sóc khách hàng",
        "Nhân sự/Hành chính/Pháp chế",
        "Tài chính/Ngân hàng/Bảo hiểm",
        "Công nghệ Thông tin",
      ].map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
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

const HomePage = () => (
  <div className="container">
    <Navbar />
    <SearchBar />
    <div className="content">
      <JobCategories />
      <JobList />
    </div>
  </div>
);

export default HomePage;
