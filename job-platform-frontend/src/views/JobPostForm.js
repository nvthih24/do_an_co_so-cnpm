import React, { useState } from "react";
import axios from "axios";
import "../styles/jobpostform.css"; // Import your CSS file

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    position: "",
    companyName: "",
    salary: "",
    address: "",
    email: "",
    recruitmentTime: "",
    deadline: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    setLoading(true);
    setError("");  // Reset any previous error

    try {
      const response = await axios.post("http://localhost:5000/api/jobs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        alert("Đăng tuyển thành công!");
        // Optionally, reset form after success
        setFormData({
          position: "",
          companyName: "",
          salary: "",
          address: "",
          email: "",
          recruitmentTime: "",
          deadline: "",
          description: "",
        });
      }
    } catch (err) {
      setError("Đăng tuyển thất bại! Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h3>Thêm chi tiết công việc</h3>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="position"
        placeholder="Vị trí tuyển dụng *"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="companyName"
        placeholder="Tên công ty *"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="salary"
        placeholder="Lương"
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Địa chỉ"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email *"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="recruitmentTime"
        placeholder="Thời gian tuyển dụng"
        onChange={handleChange}
      />
      <input
        type="date"
        name="deadline"
        placeholder="Hạn nộp hồ sơ"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Mô tả công việc"
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Đang đăng tuyển..." : "Đăng tuyển"}
      </button>
    </form>
  );
};

export default JobPostForm;