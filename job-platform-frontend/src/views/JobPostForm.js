import React, { useState } from "react";
import axios from "axios";
import "../styles/jobpostform.css";

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
    companyDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/jobs", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 201) {
        alert("Đăng tuyển thành công!");
        setFormData({
          position: "",
          companyName: "",
          salary: "",
          address: "",
          email: "",
          recruitmentTime: "",
          deadline: "",
          description: "",
          companyDescription: "",
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
        value={formData.position}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="companyName"
        placeholder="Tên công ty *"
        value={formData.companyName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="salary"
        placeholder="Lương"
        value={formData.salary}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Địa chỉ"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="recruitmentTime"
        value={formData.recruitmentTime}
        onChange={handleChange}
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Mô tả công việc"
        value={formData.description}
        onChange={handleChange}
      />
      <textarea
        name="companyDescription"
        placeholder="Mô tả về công ty"
        value={formData.companyDescription}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Đang đăng tuyển..." : "Đăng tuyển"}
      </button>
    </form>
  );
};

export default JobPostForm;
