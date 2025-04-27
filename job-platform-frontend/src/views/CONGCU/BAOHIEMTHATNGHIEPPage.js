import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/baohiemthatnghiep.css";
import RecruiterSelectionModal from "../../views/RecruiterSelectionModal";

const vung_Options = [
  { value: "I", label: "Vùng I", luongToiThieu: 4680000 },
  { value: "II", label: "Vùng II", luongToiThieu: 4160000 },
  { value: "III", label: "Vùng III", luongToiThieu: 3640000 },
  { value: "IV", label: "Vùng IV", luongToiThieu: 3250000 },
];

// Hàm format số có dấu phẩy
function formatNumberWithCommas(value) {
  if (!value) return "";
  value = value.replace(/[^0-9]/g, "");
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BaoHiemThatNghiepPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [luong, setLuong] = useState("");
  const [vung, setVung] = useState("I");
  const [ketQua, setKetQua] = useState(null);
  const [rule, setRule] = useState("new");

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

  // Xử lý nhập lương có dấu phẩy tự động
  const handleLuongChange = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setLuong(formatNumberWithCommas(raw));
  };

  // Tính toán BHTN
  const handleTinh = () => {
    const { luongToiThieu } = vung_Options.find((v) => v.value === vung);
    const luongMax = luongToiThieu * 20;
    const rawLuong = Number(luong.replace(/,/g, "")) || 0;
    const luongTinh = Math.min(rawLuong, luongMax);
    const bhNguoiLaoDong = luongTinh * 0.01;
    const bhNguoiSuDungLaoDong = luongTinh * 0.01;
    setKetQua({
      luongTinh,
      bhNguoiLaoDong,
      bhNguoiSuDungLaoDong,
      tong: bhNguoiLaoDong + bhNguoiSuDungLaoDong,
    });
  };

  return (
    <>
      {/* Navbar giữ nguyên */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/viec-lam")}>
          <img src="/Job247.jpg" alt="Logo" />
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
                  <a onClick={() => navigate("/tinh-baohiem")}>Tính bảo hiểm thất nghiệp</a>
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

      {/* Main content */}
      <div className="bhtn-container">
        <div className="bhtn-container-page">
          <div className="center-wrapper">
            <h2>Công cụ tính bảo hiểm thất nghiệp (BHTN)</h2>
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
            <div className="form-bhtn">
              <label>Chọn vùng</label>
              <select value={vung} onChange={(e) => setVung(e.target.value)}>
                {vung_Options.map((v) => (
                  <option value={v.value} key={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
              <label>Lương đóng BHTN (VNĐ):</label>
              <input
                type="text"
                value={luong}
                onChange={handleLuongChange}
                placeholder="Nhập lương hàng tháng"
                inputMode="numeric"
              />
            </div>
            <button className="btn-tinh-bhtn" onClick={handleTinh}>
              Tính BHTN
            </button>
            {ketQua && (
              <div className="result-bhtn">
                <p>
                  <b>Lương tính BHTN (không vượt quá mức tối đa):</b>{" "}
                  {ketQua.luongTinh.toLocaleString()} VNĐ
                </p>
                <p>
                  <b>BHTN người lao động đóng (1%):</b>{" "}
                  {ketQua.bhNguoiLaoDong.toLocaleString()} VNĐ
                </p>
                <p>
                  <b>BHTN người sử dụng lao động đóng (1%):</b>{" "}
                  {ketQua.bhNguoiSuDungLaoDong.toLocaleString()} VNĐ
                </p>
                <p>
                  <b>Tổng cộng hàng tháng:</b> {ketQua.tong.toLocaleString()}{" "}
                  VNĐ
                </p>
              </div>
            )}
            <div className="note-bhtn">
              <b>Lưu ý:</b> Lương tối đa để đóng BHTN = 20 x lương tối thiểu
              vùng.
            </div>
          </div>
        </div>
        <div id="sidebar-qc" className="qc-bhtn-page">
          <div className="box-qc-bhtn">
            <a href="#" target="_blank" id="link-img">
              <img
                src="https://jobsgo.vn/blog/wp-content/uploads/2022/12/tang-03-tin-tuyen-dung.png"
                alt=""
                title=""
                className="img-responsive"
              />
            </a>
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
    </>
  );
};

export default BaoHiemThatNghiepPage;
