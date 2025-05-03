import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CvLaGi.css";
import { useAuth } from "../../contexts/AuthContext";
import RecruiterSelectionModal from "../../views/RecruiterSelectionModal";

const CvLaGi = () => {
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
      <div className="cv-la-gi-page">
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
            <h1>CV là gì?</h1>
            <p>
              CV (Curriculum Vitae) là một tài liệu chứa thông tin về quá trình
              học tập, công việc và các kỹ năng của bạn. Đây là công cụ quan
              trọng giúp bạn giới thiệu bản thân một cách chi tiết và chuyên
              nghiệp khi ứng tuyển vào các công việc.
            </p>
          </section>

          <section className="why-is-cv-important">
            <h2>Tại sao CV lại quan trọng?</h2>
            <p>
              Một CV tốt không chỉ giúp bạn gây ấn tượng với nhà tuyển dụng mà
              còn là công cụ để bạn thể hiện năng lực, kỹ năng và sự phù hợp với
              công việc bạn đang ứng tuyển. CV là tài liệu đầu tiên mà nhà tuyển
              dụng sẽ xem, do đó, một CV rõ ràng, chuyên nghiệp và hấp dẫn sẽ
              giúp bạn nổi bật hơn các ứng viên khác.
            </p>
          </section>

          <section className="what-to-include">
            <h2>Những phần cơ bản trong một CV</h2>
            <ul>
              <li>
                <strong>Thông tin cá nhân:</strong> Tên, địa chỉ, số điện thoại
                và email của bạn.
              </li>
              <li>
                <strong>Mục tiêu nghề nghiệp:</strong> Một đoạn ngắn mô tả mục
                tiêu nghề nghiệp của bạn.
              </li>
              <li>
                <strong>Kinh nghiệm làm việc:</strong> Liệt kê công việc bạn đã
                làm trước đây, bao gồm cả chức danh và nhiệm vụ.
              </li>
              <li>
                <strong>Học vấn:</strong> Trình độ học vấn và các bằng cấp liên
                quan.
              </li>
              <li>
                <strong>Kỹ năng:</strong> Những kỹ năng bạn có, bao gồm kỹ năng
                mềm và kỹ năng chuyên môn.
              </li>
              <li>
                <strong>Hoạt động và chứng chỉ:</strong> Các hoạt động ngoại
                khóa, chứng chỉ, khóa học bổ sung nếu có.
              </li>
            </ul>
          </section>

          <section className="tips">
            <h2>Lời khuyên khi viết CV</h2>
            <ul>
              <li>Giữ CV ngắn gọn và dễ đọc (tốt nhất là 1-2 trang).</li>
              <li>
                Trình bày thông tin rõ ràng, có các mục riêng biệt như kinh
                nghiệm, học vấn, kỹ năng.
              </li>
              <li>Chú ý đến ngữ pháp và chính tả để tạo ấn tượng tốt.</li>
              <li>
                Đảm bảo rằng CV của bạn phù hợp với công việc bạn đang ứng
                tuyển.
              </li>
            </ul>
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

export default CvLaGi;
