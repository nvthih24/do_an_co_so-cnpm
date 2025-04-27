import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../styles/adminjobapproval.css"; 

const AdminJobApproval = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPendingJobs = async () => {   
    try {
        const res = await axios.get("http://localhost:5000/api/jobs/pending", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });      
        setPendingJobs(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy job chưa duyệt:", err);
    } finally {
      setLoading(false);
    }
  };

  const approveJob = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}/approve`);
      setPendingJobs(pendingJobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Lỗi khi duyệt job:", err);
    }
  };   

  useEffect(() => {
    const role = localStorage.getItem("role"); // lấy quyền từ localStorage
    if (role !== "admin") {
      navigate("/"); 
    } else {
      fetchPendingJobs(); 
    }
  }, []);

  if (loading) return <p>Đang tải danh sách bài đăng...</p>;

  return (
    <div className="admin-job-approval">
      <h2>Duyệt bài đăng tuyển dụng</h2>
      {pendingJobs.length === 0 ? ( 
        <p>Không có bài đăng nào chờ duyệt.</p>
      ) : (
        pendingJobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.position}</h3>
            <p><strong>Công ty:</strong> {job.companyName}</p>
            <p><strong>Lương:</strong> {job.salary}</p>
            <p><strong>Email:</strong> {job.email}</p>
            <p><strong>Ngày tuyển:</strong> {job.recruitmentTime?.slice(0, 10)}</p>
            <p><strong>Hạn nộp:</strong> {job.deadline?.slice(0, 10)}</p>
            <p><strong>Mô tả:</strong> {job.description}</p>
            <p><strong>Mô tả công ty:</strong> {job.companyDescription}</p>
            <button onClick={() => approveJob(job._id)}>✔️ Duyệt bài</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminJobApproval;
