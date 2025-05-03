import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RecruiterSelectionModal from "../../views/RecruiterSelectionModal";
import "../../styles/CachVietCV.css"; // Import CSS file for styling
const CachVietCV = () => {
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
      <div className="cach-viet-cv-page">
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
            <h1>Cách viết CV hiệu quả</h1>
            <p>
              Một CV chuyên nghiệp là yếu tố quyết định giúp bạn gây ấn tượng
              với nhà tuyển dụng. Hãy cùng tìm hiểu các bước cơ bản để viết một
              CV hoàn chỉnh và thu hút.
            </p>
          </section>

          <section className="steps">
            <h2>1. Chuẩn bị thông tin</h2>
            <p>
              Trước khi bắt tay vào viết CV, bạn cần chuẩn bị đầy đủ các thông
              tin về bản thân, bao gồm:
              <ul>
                <li>Tên, địa chỉ, số điện thoại và email.</li>
                <li>Mục tiêu nghề nghiệp ngắn gọn, rõ ràng.</li>
                <li>
                  Kinh nghiệm làm việc: Liệt kê các công việc đã làm trước đây.
                </li>
                <li>Trình độ học vấn và các chứng chỉ chuyên ngành.</li>
                <li>Kỹ năng và thành tựu nổi bật của bạn.</li>
              </ul>
            </p>

            <h2>2. Sắp xếp cấu trúc CV</h2>
            <p>
              Cấu trúc của CV cần phải rõ ràng, dễ đọc và dễ theo dõi. Thông
              thường, một CV chuẩn sẽ có các mục sau:
              <ul>
                <li>
                  <strong>Thông tin cá nhân:</strong> Bao gồm tên, địa chỉ, số
                  điện thoại và email.
                </li>
                <li>
                  <strong>Mục tiêu nghề nghiệp:</strong> Một đoạn ngắn về mục
                  tiêu công việc của bạn trong tương lai.
                </li>
                <li>
                  <strong>Kinh nghiệm làm việc:</strong> Liệt kê các công việc
                  bạn đã làm trước đây theo thứ tự thời gian giảm dần.
                </li>
                <li>
                  <strong>Học vấn:</strong> Liệt kê các bằng cấp bạn đã có, bao
                  gồm trường học và năm tốt nghiệp.
                </li>
                <li>
                  <strong>Kỹ năng:</strong> Các kỹ năng mềm và kỹ năng chuyên
                  môn bạn sở hữu.
                </li>
              </ul>
            </p>

            <h2>3. Viết mô tả công việc</h2>
            <p>
              Mỗi công việc trong phần kinh nghiệm làm việc nên có mô tả rõ ràng
              về nhiệm vụ, trách nhiệm và thành tựu của bạn. Hãy chắc chắn rằng
              bạn sử dụng động từ mạnh và mô tả công việc một cách cụ thể:
              <ul>
                <li>Chức danh công việc.</li>
                <li>Thời gian làm việc.</li>
                <li>Mô tả chi tiết công việc và những thành tích đạt được.</li>
              </ul>
            </p>

            <h2>4. Chọn phông chữ và thiết kế đơn giản</h2>
            <p>
              Đừng sử dụng các phông chữ khó đọc hoặc thiết kế quá phức tạp. Một
              CV dễ đọc với thiết kế tối giản sẽ giúp nhà tuyển dụng dễ dàng nắm
              bắt thông tin.
              <ul>
                <li>
                  Phông chữ dễ đọc như Arial, Helvetica, hoặc Times New Roman.
                </li>
                <li>
                  Đảm bảo font chữ không quá lớn hoặc quá nhỏ (14-16px cho body
                  text là lý tưởng).
                </li>
                <li>Tránh sử dụng quá nhiều màu sắc và hiệu ứng.</li>
              </ul>
            </p>

            <h2>5. Kiểm tra lỗi chính tả và ngữ pháp</h2>
            <p>
              Một trong những điều quan trọng khi viết CV là tránh sai sót về
              chính tả và ngữ pháp. Hãy đọc kỹ CV của bạn và sử dụng công cụ
              kiểm tra lỗi chính tả trước khi gửi cho nhà tuyển dụng.
            </p>
          </section>

          <section className="final-tips">
            <h2>6. Những lưu ý cuối cùng</h2>
            <ul>
              <li>
                Giữ CV ngắn gọn và chỉ tập trung vào những thông tin quan trọng.
              </li>
              <li>Chọn mẫu CV phù hợp với công việc bạn ứng tuyển.</li>
              <li>Thêm các liên kết (LinkedIn, GitHub, Portfolio) nếu có.</li>
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

export default CachVietCV;
