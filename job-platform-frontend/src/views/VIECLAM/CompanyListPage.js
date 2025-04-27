import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RecruiterSelectionModal from "../RecruiterSelectionModal";
import "../../styles/companylistpage.css";

const CompanyListPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);

  // Gọi API để lấy danh sách job đã được duyệt
  useEffect(() => {
    const fetchApprovedJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs/approved");
        const data = await res.json();
        setAllCompanies(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công ty:", error);
      }
    };

    fetchApprovedJobs();
  }, []);

  // Lọc theo tên công ty
  const filteredCompanies = allCompanies.filter((company) =>
    company.companyName?.toLowerCase().includes(searchCompanyName.toLowerCase())
  );

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
      navigate("/login?redirect=/viec-lam-phu-hop");
    } else {
      navigate("/viec-lam-phu-hop");
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/viec-lam")}>
          <img src="/Job247.jpg" alt="Logo" />
        </div>
        <ul className="nav navbar-nav navbar-left">
          <li className="navbar-left__item group">
            <a onClick={() => navigate("/viec-lam")}>Việc làm</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li><a onClick={() => navigate("/viec-lam")}>Tìm việc làm</a></li>
                <li><a onClick={handleJobClick}>Việc làm phù hợp</a></li>
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
                <li><a onClick={() => navigate("/tu-van-cv")}>Tư vấn CV</a></li>
                <li><a onClick={() => navigate("/your-cv")}>Hồ sơ của tôi</a></li>
              </ul>
            </div>
          </li>
          <li className="navbar-left__item group">
            <a onClick={() => navigate("/cong-cu")}>Công cụ</a>
            <div className="navbar__item__dropdown-menu">
              <ul className="navbar-menu">
                <li><a onClick={() => navigate("/thue-tncn")}>Tính thuế TNCN</a></li>
                <li><a onClick={() => navigate("/tinh-baohiem")}>Tính bảo hiểm</a></li>
                <li><a onClick={() => navigate("/tinh-luong")}>Tính lương</a></li>
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
              <li><button className="button outline" onClick={() => navigate("/login")}>Đăng nhập</button></li>
              <li><button className="button primary" onClick={() => navigate("/register")}>Đăng ký</button></li>
            </>
          ) : (
            <>
              <li><span className="user-greeting">Xin chào, {currentUser.name}</span></li>
              <li><button className="button outline" onClick={handleLogout}>Đăng xuất</button></li>
            </>
          )}
          <li>
            <button className="button secondary" onClick={() => setShowModal(true)}>
              Đăng tuyển & tìm hồ sơ
            </button>
          </li>
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <RecruiterSelectionModal onClose={() => setShowModal(false)} />
      )}

      {/* Danh sách công ty */}
      <div className="company-list-page">
        <div className="container_d-flex">
          <div className="box-search">
            <ul className="navbar-header-left">
              <li><a onClick={() => navigate("/company-list")}>Danh sách công ty</a></li>
              <li><a onClick={() => navigate("/top-company")}>Top công ty</a></li>
            </ul>
            <div className="captions">
              <h1 className="tille">Khám Phá 1.000+ Công Ty Nổi Bật</h1>
              <p className="descriptions">
                Tra cứu thông tin công ty, tìm hiểu về văn hóa doanh nghiệp và cơ hội nghề nghiệp tại đây.
              </p>
            </div>
            <form className="search-navbar" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nhập tên công ty..."
                className="search-input"
                value={searchCompanyName}
                onChange={(e) => setSearchCompanyName(e.target.value)}
              />
              <button className="search-button" type="submit">Tìm kiếm</button>
            </form>
          </div>

          <div className="box-image">
            <img
              src="https://static.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
              alt="Company List"
            />
          </div>
        </div>

        {/* Render danh sách công ty */}
        <div className="company-list-cty">
          <div className="container-list-cty">
            <h2 className="list-cty__title">DANH SÁCH CÁC CÔNG TY NỔI BẬT</h2>
            <div className="company-grid">
              {filteredCompanies.map((company) => (
                <div key={company._id} className="company-card">
                  <img src={company.logo} alt={company.companyName} className="company-logo" />
                  <h3>{company.companyName}</h3>
                  <p>{company.address}</p>
                  <button onClick={() => navigate(`/company/${company._id}`)}>Xem chi tiết</button>
                </div>
              ))}
              {filteredCompanies.length === 0 && (
                <p>Không tìm thấy công ty phù hợp.</p>
              )}
            </div>
          </div>
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
      </div>
    </>
  );
};

export default CompanyListPage;
