import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import "../../styles/companydetailpage.css";    


const CompanyDetailPage = () => {
  const { id } = useParams(); // lấy id công ty từ URL
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Không tìm thấy công ty.");
        }
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [id]);

  if (loading) return <p>Đang tải thông tin...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="company-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>Quay lại</button>

      <div className="company-header">
        <img src={company.logo} alt={company.companyName} className="company-detail-logo" />
        <div className="company-info">
          <h1>{company.companyName}</h1>
          <p><strong>Địa chỉ:</strong> {company.address}</p>
          <p><strong>Email:</strong> {company.email}</p>
          <p><strong>Mức lương:</strong> {company.salary}</p>
        </div>
      </div>

      <div className="company-description">
        <h2>Giới thiệu về công ty</h2>
        <p>{company.companyDescription || "Chưa cập nhật mô tả công ty."}</p>
      </div>

      <div className="job-description">
        <h2>Mô tả công việc</h2>
        <p>{company.description || "Chưa cập nhật mô tả công việc."}</p>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
