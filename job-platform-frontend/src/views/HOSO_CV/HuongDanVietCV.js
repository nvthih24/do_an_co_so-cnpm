import React from "react";
import "../../styles/huongdanvietcv.css"; // Thêm CSS cho trang này
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import RecruiterSelectionModal from "../RecruiterSelectionModal";

const HuongDanVietCVPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const [searchLocation, setSearchLocation] = React.useState("");

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
      <div className="huongdanvietcv-page">
        <section className="container-huongdanvietcv-header">
          <div className="container-huongdanvietcv-header-left">
            <h1 className="huongdanvietcv-header-title">
              Hướng dẫn viết CV theo ngành, công việc
            </h1>
            <p className="huongdanvietcv-header-description">
              Hướng dẫn viết CV giúp bạn tạo ra một bản CV chuyên nghiệp và ấn
              tượng theo từng nganh nghề, lĩnh vực và công việc mà bạn ứng
              tuyển.
            </p>
          </div>
          <div className="container-huongdanvietcv-header-right">
            <img
              src="https://static.topcv.vn/cms/mau-cv-modern_1.png6152e78bd5128.png"
              alt="Hướng dẫn viết CV"
              className="huongdanvietcv-header-image"
            />
          </div>
        </section>
        <section className="container-huongdanvietcv-list">
          <div className="row">
            <div className="bang">
              <div className="danh-muc-bang">
                <h2 id="menu-cate" className="danh-muc-title">
                  Danh mục
                </h2>
                <ul className="danh-muc-list">
                  <li onClick={() => navigate("/huong-dan-viet-cv#menu-cate")}>
                    <h3 className="chi-tiet-danh-muc-label">
                      Hướng dẫn viết CV theo ngành nghề, công việc
                    </h3>
                  </li>
                  <li onClick={() => navigate("/huong-dan-viet-cv#menu-cate")}>
                    <h3 className="chi-tiet-danh-muc-label">
                      Trái ngành - ít kinh nghiệm{" "}
                    </h3>
                  </li>
                  <li onClick={() => navigate("/huong-dan-viet-cv#menu-cate")}>
                    <h3 className="chi-tiet-danh-muc-label">Hướng dẫn khác</h3>
                  </li>
                </ul>
              </div>
            </div>
            <div className="chi-tiet-bang">
              <div id="box-0" className="box-cate">
                <div className="box-title">
                  <h2 className="box-title-label">
                    Hướng dẫn viết CV theo ngành nghề, công việc
                  </h2>
                </div>
                <p className="box-description"></p>
                <p>
                  Tổng hợp các hướng dẫn chung viết từng phần trong CV, phù hợp
                  cho bạn ở bất kỳ ngành nghề nào.
                </p>
                <p></p>
                <div className="box-reference">
                  <ul className="row">
                    <li className="noi-dung-box">
                      <a
                        title="10 kỹ năng trong CV nên có để thu hút nhà tuyển dụng"
                        className="single-line"
                        href="#"
                      >
                        10 kỹ năng trong CV nên có để thu hút nhà tuyển dụng
                      </a>
                    </li>
                    <li className="noi-dung-box">
                      <a
                        title="Cách viết email xin việc chuẩn để ngay lập tức ghi điểm với nhà tuyển dụng"
                        className="single-line"
                        href="#"
                      >
                        Cách viết email xin việc chuẩn để ngay lập tức ghi điểm
                        với nhà tuyển dụng
                      </a>
                    </li>
                    <li className="noi-dung-box">
                      <a
                        title="Cách viết thông tin cá nhân trong CV"
                        className="single-line"
                        href="#"
                      >
                        Cách viết thông tin cá nhân trong CV
                      </a>
                    </li>
                    <li className="noi-dung-box">
                      <a
                        title="Hoàn thiện CV xin việc với bảng kiểm tra lỗi CV chuẩn chỉnh nhất"
                        className="single-line"
                        href="#"
                      >
                        Hoàn thiện CV xin việc với bảng kiểm tra lỗi CV chuẩn
                        chỉnh nhất
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="box-1" className="box-cate">
                <div className="box-title">
                  <h2 className="box-title-label">
                    Hướng dẫn viết CV trái ngành - ít kinh nghiệm
                  </h2>
                </div>
                <p className="box-description"></p>
                <p></p>
                <div className="box-reference">
                  <ul className="row">
                    <li className="noi-dung-box">
                      <a
                        title="Cách viết CV cho sinh viên mới ra trường"
                        className="single-line"
                        href="#"
                      >
                        Cách viết CV cho sinh viên mới ra trường
                      </a>
                    </li>
                    <li className="noi-dung-box">
                      <a
                        title="Cách viết CV cho người chưa có kinh nghiệm"
                        className="single-line"
                        href="#"
                      >
                        Cách viết CV cho người chưa có kinh nghiệm
                      </a>
                    </li>
                    <li className="noi-dung-box">
                      <a
                        title="Cách viết CV cho người chuyển việc"
                        className="single-line"
                        href="#"
                      >
                        Cách viết CV cho người chuyển việc
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="box-2" className="box-cate">
                <div className="box-title">
                  <h2 className="box-title-label">Hướng dẫn khác</h2>
                </div>
                <p className="box-description"></p>
                <p></p>
                <div className="box-reference">
                  <ul className="row">
                    <li className="noi-dung-box">
                      <a
                        title="Cách viết CV cho người có kinh nghiệm"
                        className="single-line"
                        href="#"
                      >
                        Cách viết CV cho người có kinh nghiệm
                      </a>
                    </li>
                    <li className="noi-dung-box">
                      <a
                        title="Cách viết CV cho người đi làm lâu năm"
                        className="single-line"
                        href="#"
                      >
                        Cách viết CV cho người đi làm lâu năm
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default HuongDanVietCVPage;
