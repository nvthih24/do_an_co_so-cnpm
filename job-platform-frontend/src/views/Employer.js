import React from "react";
import "../styles/employer_.css";

const Employer = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <h3>Nguyễn Văn Thịnh</h3>
          <p>Employer</p>
        </div>
        <ul>
          <li>Bảng tin</li>
          <li>TopCV Insights</li>
          <li>TopCV Rewards</li>
          <li>Chiến dịch tuyển dụng</li>
          <li>Quản lý CV</li>
          <li>Báo cáo tuyển dụng</li>
        </ul>
      </aside>

      <main className="content">
        <h2>Xin chào, Nguyễn Văn Thịnh</h2>
        <p>Hoàn thành các bước để nhận +8 Top Point</p>
        <ul className="verify-list">
          <li onClick={() => alert("Xác thực số điện thoại")}>
            Xác thực số điện thoại
            <span className="arrow">&rarr;</span>
          </li>
          <li onClick={() => alert("Cập nhật thông tin công ty")}>
            Cập nhật thông tin công ty
            <span className="arrow">&rarr;</span>
          </li>
          <li onClick={() => alert("Cập nhật giấy phép kinh doanh")}>
            Cập nhật giấy phép kinh doanh
            <span className="arrow">&rarr;</span>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Employer;
