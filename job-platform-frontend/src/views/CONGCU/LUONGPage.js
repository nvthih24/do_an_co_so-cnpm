import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RecruiterSelectionModal from "../../views/RecruiterSelectionModal";
import "../../styles/tinhluong.css";

const LuongPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState("gross");
  const [netSalary, setNetSalary] = useState(null);
  const [grossSalary, setGrossSalary] = useState(null);
  const [bhxh, setBhxh] = useState(null);
  const [bhyt, setBhyt] = useState(null);
  const [bhtn, setBhtn] = useState(null);
  const [tncn, setTncn] = useState(null);
  const [rule, setRule] = useState("new");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleJobClick = () => {
    navigate(
      currentUser ? "/viec-lam-phu-hop" : "/login?redirect=/viec-lam-phu-hop"
    );
  };

  const tinhLuong = () => {
    const salaryNumber = parseFloat(salary.replace(/,/g, ""));
    let gross, net, bhxh, bhyt, bhtn, tncn;

    if (salaryType === "gross") {
      gross = salaryNumber;
      bhxh = gross * 0.08;
      bhyt = gross * 0.015;
      bhtn = gross * 0.01;
      tncn = gross > 11000000 ? (gross - 11000000) * 0.05 : 0;
      net = gross - bhxh - bhyt - bhtn - tncn;
    } else {
      net = salaryNumber;
      gross = net / 0.895; // approximate calculation
      bhxh = gross * 0.08;
      bhyt = gross * 0.015;
      bhtn = gross * 0.01;
      tncn = gross > 11000000 ? (gross - 11000000) * 0.05 : 0;
    }

    setGrossSalary(Math.round(gross));
    setNetSalary(Math.round(net));
    setBhxh(Math.round(bhxh));
    setBhyt(Math.round(bhyt));
    setBhtn(Math.round(bhtn));
    setTncn(Math.round(tncn));
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

      <div className="luong-container">
        <div className="luong-page">
          <div className="center-wrapper">
            <h2>Tính lương Gross sang Net và ngược lại</h2>
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
                    (132 triệu đồng/năm) với nguời nộp thuế và 4,4 triệu
                    đồng/tháng với mỗi người phụ thuộc (Theo Nghị quyết số
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
                    01/07/2024 (Theo Nghị định số 73/2024/NĐ-CP)
                  </li>
                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng <a href="#">mức lương tối thiểu vùng</a> mới nhất có
                    hiệu lực từ ngày 01/07/2024 (Theo Nghị định 74/2024/NĐ-CP)
                  </li>
                  <li>
                    <span className="info-icon">ⓘ</span>
                    Áp dụng mức giảm trừ gia cảnh mới nhất 11 triệu đồng/tháng
                    (132 triệu đồng/năm) với nguời nộp thuế và 4,4 triệu
                    đồng/tháng với mỗi người phụ thuộc (Theo Nghị quyết số
                    954/2020/UBTVQH14)
                  </li>
                </ul>
              </div>
            )}
            <div className="box_noi-dung-thue">
              <div className="box_noi-dung-thue_item">
                <p className="title-block">Lương cơ sở: </p>
                <span className="number-yellow">2,340,000đ</span>
              </div>
              <div className="box_noi-dung-thue_item">
                <p className="title-block">Giảm trừ gia cảnh bản thân: </p>
                <span className="number-yellow">11,000,000đ</span>
              </div>
              <div className="box_noi-dung-thue_item">
                <p className="title-block">Người phụ thuộc: </p>
                <span className="number-yellow">4,400,000đ</span>
              </div>
            </div>
            <div className="salary-form">
              <label>Chọn loại lương:</label>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="gross">Gross sang Net</option>
                <option value="net">Net sang Gross</option>
              </select>

              <label>
                Nhập mức lương ({salaryType === "gross" ? "Gross" : "Net"}):
              </label>
              <input
                type="text"
                placeholder="Nhập lương"
                value={salary}
                onChange={(e) =>
                  setSalary(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  )
                }
              />
              {netSalary !== null && (
                <div className="salary-result">
                  <p>Lương Gross: {grossSalary.toLocaleString()} VNĐ</p>
                  <p>Lương Net: {netSalary.toLocaleString()} VNĐ</p>
                  <p>Bảo hiểm xã hội (8%): {bhxh.toLocaleString()} VNĐ</p>
                  <p>Bảo hiểm y tế (1.5%): {bhyt.toLocaleString()} VNĐ</p>
                  <p>Bảo hiểm thất nghiệp (1%): {bhtn.toLocaleString()} VNĐ</p>
                  <p>Thuế TNCN (ước tính 5%): {tncn.toLocaleString()} VNĐ</p>
                </div>
              )}
            </div>
            <button className="btn-calc" onClick={tinhLuong}>
              Tính lương
            </button>
          </div>
        </div>

        <div id="sidebar-qc" className="qc-luong-page">
          <div className="box-qc-luong">
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

export default LuongPage;
