import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CVXinViecLaGi.css"; // Thêm CSS cho trang này
import RecruiterSelectionModal from "../../views/RecruiterSelectionModal";
import { useAuth } from "../../contexts/AuthContext"; // Import context AuthContext
const CVXinViecLaGi = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
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
      <div className="cv-xin-viec-la-gi-page">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/cv-la-gi">CV là gì?</Link>
              </li>
              <li>
                <Link to="/cach-viet-cv">Cách viết CV</Link>
              </li>
              <li>
                <Link to="/cv-xin-viec">CV xin việc</Link>
              </li>
              <li>
                <Link to="/mau-cv">Mẫu CV</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <section className="intro">
            <h1>CV xin việc là gì?</h1>
            <p>
              CV xin việc (Curriculum Vitae) là tài liệu quan trọng giúp bạn
              giới thiệu bản thân với nhà tuyển dụng khi ứng tuyển vào một công
              việc. Đây là công cụ không thể thiếu giúp bạn gây ấn tượng và thể
              hiện sự phù hợp của mình đối với công việc đang ứng tuyển.
            </p>
          </section>

          <section className="purpose">
            <h2>Mục đích của CV xin việc</h2>
            <p>
              Mục đích chính của CV xin việc là:
              <ul>
                <li>
                  Giới thiệu thông tin cá nhân, kỹ năng, kinh nghiệm làm việc
                  của bạn.
                </li>
                <li>
                  Thể hiện khả năng và sự phù hợp với công việc mà bạn đang ứng
                  tuyển.
                </li>
                <li>
                  Gây ấn tượng với nhà tuyển dụng và thuyết phục họ mời bạn tham
                  gia phỏng vấn.
                </li>
              </ul>
            </p>
          </section>

          <section className="difference">
            <h2>Sự khác biệt giữa CV và Resume</h2>
            <p>
              Mặc dù cả CV và Resume đều dùng để ứng tuyển vào công việc, nhưng
              chúng có sự khác biệt:
              <ul>
                <li>
                  <strong>CV (Curriculum Vitae):</strong> Thường dài hơn và chi
                  tiết hơn, bao gồm tất cả các thông tin về sự nghiệp của bạn,
                  bao gồm cả các hoạt động ngoại khóa, học vấn, kinh nghiệm làm
                  việc, thành tựu, v.v. CV chủ yếu được sử dụng trong các ứng
                  dụng học thuật hoặc công việc nghiên cứu.
                </li>
                <li>
                  <strong>Resume:</strong> Thường ngắn gọn hơn (1-2 trang) và
                  tập trung vào những thông tin liên quan trực tiếp đến công
                  việc mà bạn đang ứng tuyển. Resume ngắn gọn và dễ hiểu hơn,
                  giúp nhà tuyển dụng dễ dàng đánh giá bạn.
                </li>
              </ul>
            </p>
          </section>

          <section className="key-components">
            <h2>Những phần chính trong một CV xin việc</h2>
            <p>
              Một CV xin việc hoàn chỉnh sẽ bao gồm các phần sau:
              <ul>
                <li>
                  <strong>Thông tin cá nhân:</strong> Bao gồm tên, địa chỉ, số
                  điện thoại và email.
                </li>
                <li>
                  <strong>Mục tiêu nghề nghiệp:</strong> Mô tả ngắn gọn về mục
                  tiêu và định hướng nghề nghiệp của bạn.
                </li>
                <li>
                  <strong>Kinh nghiệm làm việc:</strong> Các công việc bạn đã
                  làm trước đây, với các mô tả chi tiết về nhiệm vụ và thành
                  tích đạt được.
                </li>
                <li>
                  <strong>Học vấn:</strong> Liệt kê các trường học bạn đã theo
                  học và các bằng cấp đạt được.
                </li>
                <li>
                  <strong>Kỹ năng:</strong> Liệt kê các kỹ năng chuyên môn và kỹ
                  năng mềm.
                </li>
                <li>
                  <strong>Hoạt động và chứng chỉ:</strong> Các hoạt động ngoại
                  khóa, chứng chỉ và khóa học liên quan.
                </li>
              </ul>
            </p>
          </section>

          <section className="importance">
            <h2>Tại sao CV xin việc lại quan trọng?</h2>
            <p>
              CV xin việc đóng vai trò quan trọng trong quá trình tuyển dụng.
              Một CV được viết tốt sẽ giúp bạn:
              <ul>
                <li>
                  Thu hút sự chú ý của nhà tuyển dụng và tạo ấn tượng ban đầu
                  tốt.
                </li>
                <li>
                  Thể hiện khả năng của bạn trong việc phù hợp với công việc mà
                  bạn đang ứng tuyển.
                </li>
                <li>Tăng cơ hội nhận được lời mời phỏng vấn.</li>
              </ul>
            </p>
          </section>
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

export default CVXinViecLaGi;
