import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RecruiterSelectionModal from "../views/RecruiterSelectionModal";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [filterType, setFilterType] = useState("Địa điểm"); // Lọc theo gì
  const [selectedBadge, setSelectedBadge] = useState("Tất cả"); // Badge được chọn

  // Badge từng loại filter
  const locationBadges = [
    "Hà Nội",
    "Ba Đình",
    "Hoàn Kiếm",
    "Hai Bà Trưng",
    "Đống Đa",
    "Tây Hồ",
    "Cầu Giấy",
    "HCM",
  ];
  const salaryBadges = ["< 10tr", "10tr - 20tr", "20tr - 30tr", "> 30tr"];
  const expBadges = [
    "Chưa có kinh nghiệm",
    "Dưới 1 năm",
    "1-2 năm",
    "Trên 2 năm",
  ];
  const positionBadges = ["IT", "Marketing", "Kế toán", "Kinh doanh", "Design"];

  // Gọi API để lấy dữ liệu việc làm đã được admin duyệt
  useEffect(() => {
    setSelectedBadge("Tất cả");
    const fetchApprovedJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs/approved"); // API lấy danh sách việc làm đã được duyệt
        const data = await res.json();
        setAllJobs(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách việc làm:", error);
      }
    };

    fetchApprovedJobs();
  }, [filterType]);

  const filteredJobs = allJobs.filter((job) => {
    // Tìm kiếm chung theo title/location
    const matchTitle = job.position
      ?.toLowerCase()
      .includes(searchTitle.toLowerCase());
    const matchLocation = job.address
      ?.toLowerCase()
      .includes(searchLocation.toLowerCase());

    // Nếu đang tìm kiếm theo input (giống filter của bạn cũ)
    if (searchTitle || searchLocation) {
      return matchTitle && matchLocation;
    }
    // Nếu không tìm kiếm gì thì trả về tất cả việc làm
    if (selectedBadge === "Tất cả") return true;

    // Nếu lọc badge filter
    if (selectedBadge) {
      if (filterType === "Địa điểm") {
        if (selectedBadge === "Tất cả") return true;
        // Đảm bảo trường này trùng với field trong dữ liệu
        return job.address?.toLowerCase().includes(selectedBadge.toLowerCase());
      }
      if (filterType === "Mức lương") {
        if (selectedBadge === "Tất cả") return true;
        return job.salary?.toLowerCase().includes(selectedBadge.toLowerCase());
      }
      if (filterType === "Kinh nghiệm") {
        if (selectedBadge === "Tất cả") return true;
        // Đảm bảo trường này trùng với field trong dữ liệu
        return job.exp?.toLowerCase().includes(selectedBadge.toLowerCase());
      }
      if (filterType === "Ngành nghề") {
        if (selectedBadge === "Tất cả") return true;
        // Đảm bảo trường này trùng với field trong dữ liệu
        return job.position
          ?.toLowerCase()
          .includes(selectedBadge.toLowerCase());
      }
    }
    // Nếu không filter gì
    return true;
  });

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

  // Badge hiện tại dựa theo filterType
  const getBadgeList = () => {
    if (filterType === "Địa điểm") return locationBadges;
    if (filterType === "Mức lương") return salaryBadges;
    if (filterType === "Kinh nghiệm") return expBadges;
    if (filterType === "Ngành nghề") return positionBadges;
    return [];
  };
  const badgeList = {
    "Địa điểm": locationBadges,
    "Kinh nghiệm": expBadges,
    "Mức lương": salaryBadges,
    "Ngành nghề": positionBadges,
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
      <div className="page-wrapper">
        <div className="body-qc">
          <div className="text-name">
            <h1>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc</h1>
            <p>
              Tiếp cận 40,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn
              doanh nghiệp uy tín tại Việt Nam
            </p>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Vị trí tuyển dụng, tên công ty"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Địa điểm"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button className="button primary">Tìm kiếm</button>
          </div>
        </div>

        <div className="content">
          <div className="job-list">
            <h2 className="job-filter-title">Việc làm tốt nhất</h2>
            <div className="job-filter-bar">
              <select
                className="dropdown-loc-btn"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setSelectedBadge("");
                }}
              >
                <option>Địa điểm</option>
                <option>Mức lương</option>
                <option>Kinh nghiệm</option>
                <option>Ngành nghề</option>
              </select>
              <div className="badge-filter-row">
                <button
                  className={`badge ${
                    selectedBadge === "Tất cả" ? "active" : ""
                  }`}
                  onClick={() => setSelectedBadge("Tất cả")}
                >
                  Tất cả
                </button>
                {badgeList[filterType]?.map((item) => (
                  <button
                    className={`badge ${
                      selectedBadge === item ? "active" : ""
                    }`}
                    onClick={() => setSelectedBadge(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {/* --- End filter --- */}
            </div>
            <div className="job-grid">
              {filteredJobs.map((job, index) => (
                <div key={index} className="job-card">
                  <h3>{job.position}</h3>
                  <p className="company">
                    {job.companyName} - {job.address}
                  </p>
                  <div className="job-footer">
                    <p className="salary">{job.salary}</p>
                    <button className="button outline">Ứng tuyển</button>
                  </div>
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <p>Không tìm thấy việc làm phù hợp.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ← đóng page-wrapper */}
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

export default HomePage;
