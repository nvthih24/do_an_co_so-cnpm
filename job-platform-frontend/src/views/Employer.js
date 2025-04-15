import React from "react";
import "../styles/employer_.css";
import { useAuth } from "../contexts/AuthContext"; // Import context
import JobPostForm from "../views/JobPostForm";

const Employer = () => {
  const { currentUser } = useAuth(); // Lấy người dùng hiện tại

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <h3>{currentUser?.name || "Người dùng"}</h3> {/* Hiển thị tên đăng nhập */}
          <p>Employer</p>
        </div>
      </aside>

      <main className="content">
        <h2>Xin chào, {currentUser?.name || "Người dùng"}</h2>

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

        {/* Thêm form chi tiết công việc */}
        <JobPostForm />
      </main>
    </div>
  );
};

export default Employer;
