import React, { useState } from "react";
import "../../styles/thuetncn.css"; // Import CSS styles for the component
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ThueTNCNPage = () => {
  const [salary, setSalary] = useState("");
  const [soNguoiPhuThuoc, setSoNguoiPhuThuoc] = useState(0);
  const [ketQua, setKetQua] = useState(null);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [chonRule, setChonRule] = useState("new");
  const [rule, setRule] = useState("new");

  const giamTruBanThan = 11000000;
  const giamTruPhuThuoc = 4400000;

  function tinhThueTNCN(thueChiuThue) {
    let bac = [
      { max: 5000000, rate: 0.05 },
      { max: 10000000, rate: 0.1 },
      { max: 18000000, rate: 0.15 },
      { max: 32000000, rate: 0.2 },
      { max: 52000000, rate: 0.25 },
      { max: 80000000, rate: 0.3 },
      { max: Infinity, rate: 0.35 },
    ];
    let tienThue = 0,
      conLai = thueChiuThue;
    let last = 0;
    for (let i = 0; i < bac.length && conLai > 0; i++) {
      let muc = Math.min(conLai, bac[i].max - last);
      tienThue += muc * bac[i].rate;
      conLai -= muc;
      last = bac[i].max;
    }
    return tienThue;
  }

  const handleTinhThue = () => {
    const gross = parseInt(salary) || 0;
    const giamTru = giamTruBanThan + soNguoiPhuThuoc * giamTruPhuThuoc;
    const thuNhapChiuThue = Math.max(0, gross - giamTru);

    const thueTNCN = tinhThueTNCN(thuNhapChiuThue);

    setKetQua({
      thuNhapChiuThue,
      thueTNCN,
      thuNhapSauThue: gross - thueTNCN,
    });
  };

  const handleJobClick = () => {
    if (!currentUser) {
      navigate("/login?redirect=/viec-lam-phu-hop"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    } else {
      navigate("/viec-lam-phu-hop"); // Điều hướng đến trang việc làm phù hợp nếu đã đăng nhập
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
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
      <div className="thue-body-page">
        <div className="tinhtnc-page">
          <div className="center-wrapper">
            <h2>Công cụ tính thuế thu nhập cá nhân (TNCN)</h2>
            <div className="chon-rule">
              <label> Áp dụng quy định: </label>
              <div className="list-option">
                <label
                  className={
                    rule === "old"
                      ? "custom-radio_input-radio active"
                      : "custom-radio_input-radio"
                  }
                >
                  <input
                    type="radio"
                    name="rule"
                    value="old"
                    checked={rule === "old"}
                    onChange={() => setRule("old")}
                  />
                  <span className="input-radio_label">
                    Từ 01/07/2023 - 30/06/2024
                  </span>
                </label>
                <label
                  className={
                    rule === "new"
                      ? "custom-radio_input-radio active"
                      : "custom-radio_input-radio"
                  }
                >
                  <input
                    type="radio"
                    name="rule"
                    value="new"
                    checked={rule === "new"}
                    onChange={() => setRule("new")}
                  />
                  <span className="input-radio_label">
                    Từ 01/07/2024 - (Mới nhất)
                  </span>
                </label>
              </div>
            </div>
            {/* Nội dung thay đổi dựa vào rule */}
            {rule === "old" ? (
              <div className="box_noi-dung">
                <ul>
                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng mức lương cơ sở có hiệu lực từ ngày 01/07/2023 (Theo
                    Nghị định 24/2023/NĐ-CP) đến ngày 30/06/2024
                  </li>
                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng <a href="#">mức lương tối thiểu vùng</a> có hiệu lực
                    từ ngày 01/07/2022 (Theo điều 3, Nghị định 38/2022/NĐ-CP)
                    đến ngày 30/06/2024
                  </li>

                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng mức giảm trừ gia cảnh mới nhất 11 triệu đồng/tháng
                    (132 triệu đồng/năm) với người nộp thuế và 4,4 triệu
                    đồng/tháng với mỗi người phụ thuộc (Theo Nghị Quyết số
                    954/2020/UBTVQH14)
                  </li>
                </ul>
              </div>
            ) : (
              <div className="box_noi-dung">
                <ul>
                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng mức lương cơ sở mới nhất có hiệu lực từ ngày
                    01/07/2024 (Theo Nghị định số 73/2024/NĐ-CP).
                  </li>
                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng <a href="#">mức lương tối thiểu vùng</a> mới nhất có
                    hiệu lực từ ngày 01/07/2024 (Theo Nghị định 74/2024/NĐ-CP).
                  </li>
                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng mức giảm trừ gia cảnh mới nhất 11 triệu đồng/tháng
                    (132 triệu đồng/năm) với người nộp thuế và 4,4 triệu
                    đồng/tháng với mỗi người phụ thuộc (Theo Nghị Quyết số
                    954/2020/UBTVQH14)
                  </li>
                </ul>
              </div>
            )}
            <div className="box_noi-dung-thue">
              <div className="box_noi-dung-thue_item">
                <p className="title-block">Giảm trừ gia cảnh bản thân</p>
                <span className="number-yellow"> 11,000,000đ</span>
              </div>
              <div className="box_noi-dung-thue_item">
                <p className="title-block">Người phụ thuộc</p>
                <span className="number-yellow"> 4,000,000đ</span>
              </div>
            </div>
            <div className="form-luong">
              <label>Lương/tháng (VNĐ):</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Nhập lương gross/tháng"
              />
            </div>
            <div className="form-luong">
              <label>Số người phụ thuộc:</label>
              <input
                type="number"
                value={soNguoiPhuThuoc}
                onChange={(e) => setSoNguoiPhuThuoc(e.target.value)}
                min="0"
              />
            </div>
            <button className="btn-tinh-thue" onClick={handleTinhThue}>
              Tính thuế
            </button>
            {ketQua && (
              <div className="result-thue">
                <p>
                  <b>Thu nhập chịu thuế:</b>{" "}
                  {ketQua.thuNhapChiuThue.toLocaleString()} VND
                </p>
                <p>
                  <b>Thuế TNCN phải đóng:</b> {ketQua.thueTNCN.toLocaleString()}{" "}
                  VND
                </p>
                <p>
                  <b>Thu nhập sau thuế:</b>{" "}
                  {ketQua.thuNhapSauThue.toLocaleString()} VND
                </p>
              </div>
            )}
            <p className="note-luu-y-thue">
              <b>Lưu ý:</b> Tính toán dựa trên lương gross, chưa bao gồm các
              khoản bảo hiểm bắt buộc.
            </p>
          </div>
        </div>
        <div id="sidebar-qc" className="qc-body-page">
          <div className="box-qc-page">
            <a href="#" target="_blank" id="link-img">
              <img
                src="https://jobsgo.vn/blog/wp-content/uploads/2022/12/tang-03-tin-tuyen-dung.png"
                alt
                title
                className="img-responsive"
              ></img>
            </a>
          </div>
        </div>
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

export default ThueTNCNPage;
