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
  const [businessLicense, setBusinessLicense] = useState(null);
  const [logo, setLogo] = useState(null);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      // Gửi dữ liệu công việc trước (chưa có giấy phép và logo)
      const response = await axios.post("http://localhost:5000/api/jobs", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 201) {
        const jobId = response.data._id; // lấy id job vừa tạo
  
        // Nếu có file giấy phép thì upload giấy phép
        if (businessLicense) {
          const uploadData = new FormData();
          uploadData.append("businessLicense", businessLicense);
  
          await axios.post(
            `http://localhost:5000/api/jobs/upload-license/${jobId}`,
            uploadData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log("Upload business license thành công");
        }
  
        // Nếu có file logo thì upload logo
        if (logo) {
          const uploadLogoData = new FormData();
          uploadLogoData.append("logo", logo);
  
          await axios.post(
            `http://localhost:5000/api/jobs/upload-logo/${jobId}`,
            uploadLogoData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log("Upload logo thành công");
        }
  
        alert("Đăng tuyển thành công!");
        // Reset form
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
        setBusinessLicense(null);
        setLogo(null);
      }
    } catch (err) {
      console.error(err);
      setError("Đăng tuyển thất bại! Vui lòng thử lại.");
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
      <label>Giấy phép kinh doanh:</label>
      <input 
        type="file" 
        name="businessLicense" 
        accept="image/*,application/pdf" 
        onChange={(e) => setBusinessLicense(e.target.files[0])}
      />
      <label>Logo công ty:</label>
      <input 
        type="file" 
        name="logo" 
        accept="image/*" 
        onChange={(e) => setLogo(e.target.files[0])}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Đang đăng tuyển..." : "Đăng tuyển"}
      </button>
    </form>
  );
};

export default JobPostForm;
