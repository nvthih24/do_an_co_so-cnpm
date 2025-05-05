import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/adminjobapproval.css"; 

const AdminJobApproval = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("pending"); // pending | approved
  const navigate = useNavigate();

  const fetchPendingJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(res.data);
      setCurrentTab("pending");
    } catch (err) {
      console.error("Lỗi khi lấy job chưa duyệt:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/approved", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(res.data);
      setCurrentTab("approved");
    } catch (err) {
      console.error("Lỗi khi lấy job đã duyệt:", err);
    } finally {
      setLoading(false);
    }
  };

  const approveJob = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Duyệt bài thành công!");
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Lỗi khi duyệt job:", err);
      alert("Duyệt bài thất bại!");
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá bài đăng này không?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Xoá bài đăng thành công!");
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Lỗi khi xoá job:", err);
      alert("Xoá bài đăng thất bại!");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    } else {
      fetchPendingJobs();
    }
  }, [navigate]);

  if (loading) return <p>Đang tải danh sách bài đăng...</p>;

  return (
    <div className="admin-job-approval">
      <h2>{currentTab === "pending" ? "Duyệt bài đăng tuyển dụng" : "Lịch sử duyệt bài"}</h2>

      <div style={{ marginBottom: "20px" }}>
        <button className="btn-approval" onClick={fetchPendingJobs} style={{ marginRight: "10px" }}>
          Công việc chờ duyệt
        </button>
        <button className="btn-approval" onClick={fetchApprovedJobs}>
          Lịch sử duyệt bài
        </button>
      </div>

      {jobs.length === 0 ? (
        <p>Không có bài đăng nào.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.position}</h3>
            <p><strong>Công ty:</strong> {job.companyName}</p>
            <p><strong>Lương:</strong> {job.salary}</p>
            <p><strong>Email:</strong> {job.email}</p>
            <p><strong>Ngày tuyển:</strong> {job.recruitmentTime?.slice(0, 10)}</p>
            <p><strong>Hạn nộp:</strong> {job.deadline?.slice(0, 10)}</p>
            <p><strong>Mô tả:</strong> {job.description}</p>
            <p><strong>Mô tả công ty:</strong> {job.companyDescription}</p>
            <p><strong>Giấy phép kinh doanh:</strong></p>
            <img
              src={job.businessLicense}
              alt="Giấy phép kinh doanh"
              style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain", marginTop: "10px" }}
            />
            <p><strong>Logo công ty:</strong></p>
            <img
              src={job.logo}
              alt="Logo công ty"
              style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain", marginTop: "10px" }}
            />

            {/* Nếu là pending thì có nút duyệt và xoá */}
            {currentTab === "pending" && (
              <>
                <button className="approve-button" onClick={() => approveJob(job._id)}>✔️ Duyệt bài</button>
                <button className="delete-button" onClick={() => deleteJob(job._id)}>❌ Xoá bài</button>
              </>

            )}
            {/* Nếu là approved thì chỉ có nút xoá */}
            {currentTab === "approved" && (
              <button className="delete-button" onClick={() => deleteJob(job._id)}>❌ Xoá bài</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminJobApproval;
