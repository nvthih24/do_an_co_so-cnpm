import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/jobs/${id}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((error) => {
        console.error("Có lỗi khi tải dữ liệu: ", error);
      });
  }, [id]);

  const saveJobToSession = (job) => {
    // Lưu thông tin công việc vào sessionStorage
    let savedJobs = JSON.parse(sessionStorage.getItem("savedJobs")) || [];
    
    // Kiểm tra nếu công việc chưa được lưu, thêm vào mảng
    if (!savedJobs.some((savedJob) => savedJob._id === job._id)) {
      savedJobs.push(job);
      sessionStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      alert("Tin tuyển dụng đã được lưu!");
    } else {
      alert("Bạn đã lưu tin này rồi.");
    }
  };

  if (!job) return <div>Đang tải...</div>;

  if (!job.isApproved) {
    return <div>Bài đăng này chưa được duyệt.</div>;
  }

  return (
    <div className="apply-page">
      <h1>{job.position}</h1>
      <h2>{job.companyName}</h2>
      {job.logo && (
        <img
          src={job.logo}
          alt="Logo công ty"
          style={{ width: "150px", height: "auto", margin: "10px 0" }}
        />
      )}
      <p><strong>Địa chỉ:</strong> {job.address}</p>
      <p><strong>Thời hạn nộp CV:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
      <h3>Mô tả công việc</h3>
      <p>{job.description}</p>

      {/* Nút quay về trang chủ */}
      <button
        onClick={() => navigate("/")} // Điều hướng về trang chủ
        className="button back-to-home"
      >
        Quay về trang chủ
      </button>

      {/* Nút Lưu tin này */}
      <button
        onClick={() => saveJobToSession(job)} // Lưu công việc vào session
        className="button save-job"
      >
        Lưu tin này
      </button>
    </div>
  );
};

export default ApplyPage;
