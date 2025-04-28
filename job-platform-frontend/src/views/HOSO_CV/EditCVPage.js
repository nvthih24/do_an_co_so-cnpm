import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import cvTemplates from "./CvTemplate";
import "../../styles/editcvpage.css";
import "../../styles/cvtemplate-preview.css";

const EditCVPage = () => {
  const { id } = useParams();
  const template = cvTemplates.find((t) => t.id === id);
  const [fields, setFields] = useState(template ? { ...template.fields } : {});
  const previewRef = useRef();

  if (!template) return <p>Không tìm thấy template</p>;

  // Handlers chung
  const handleChange = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFields((f) => ({ ...f, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0);
    pdf.save(`${fields.fullName || "cv"}.pdf`);
  };

  // helper dựng field
  const Field = (label, name, opts = {}) => (
    <label className={opts.full ? "full" : ""}>
      <span>{label}</span>
      {opts.textarea ? (
        <textarea
          name={name}
          value={fields[name] || ""}
          onChange={handleChange}
        />
      ) : (
        <input
          type={opts.type || "text"}
          name={name}
          value={fields[name] || ""}
          onChange={handleChange}
        />
      )}
    </label>
  );

  const isHaveAvatar = id === "pro" || id === "ambition";

  // form bên trái
  const renderForm = () => (
    <>
      {isHaveAvatar && (
        <label className="full">
          <span>Ảnh đại diện:</span>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>
      )}
      {Field("Họ tên:", "fullName")}
      {id === "pro" && Field("Ngày sinh:", "dob")}
      {id === "pro" && Field("Giới tính:", "gender")}
      {(id === "ambition" || id === "expert") && Field("Vị trí:", "position")}
      {Field("Số điện thoại:", "phone")}
      {Field("Email:", "email")}
      {Field("Website:", "website")}
      {Field("Địa chỉ:", "address")}
      {Field("Kỹ năng:", "skills", { textarea: true, full: true })}
      {Field("Sở thích:", "hobbies", { textarea: true, full: true })}
      {Field("Người giới thiệu:", "reference", { textarea: true, full: true })}
      {Field("Thông tin thêm:", "additional", { textarea: true, full: true })}
      {Field("Mục tiêu nghề nghiệp:", "objective", { textarea: true, full: true })}
      {Field("Kinh nghiệm:", "experience", { textarea: true, full: true })}
      {Field("Học vấn:", "education", { textarea: true, full: true })}
      {Field("Giải thưởng:", "award", { textarea: true, full: true })}
      {Field("Chứng chỉ:", "certificate", { textarea: true, full: true })}
      {Field("Hoạt động:", "activity", { textarea: true, full: true })}
    </>
  );

  // helper Avatar
  const Avatar = ({ cls }) =>
    isHaveAvatar ? (
      <div
        className={cls}
        style={{
          backgroundImage: `url(${fields.avatar || "/avatar-default.png"})`,
        }}
      />
    ) : null;

  // 3 preview
  const Pro = () => (
    <div ref={previewRef} className="cv-preview-pro editcv-preview">
      <div className="cvpro-left">
        <Avatar cls="avatar" />
        <div className="info-block">
          <div><b>Ngày sinh:</b> {fields.dob}</div>
          <div><b>Giới tính:</b> {fields.gender}</div>
          <div><b>SĐT:</b> {fields.phone}</div>
          <div><b>Email:</b> {fields.email}</div>
          <div><b>Địa chỉ:</b> {fields.address}</div>
          <div><b>Website:</b> {fields.website}</div>
        </div>
        <div className="objective-block"><b>Mục tiêu nghề nghiệp</b><br />{fields.objective}</div>
        <div className="skills-block"><b>Kỹ năng</b><br />{fields.skills}</div>
        <div className="hobbies-block"><b>Sở thích</b><br />{fields.hobbies}</div>
      </div>
      <div className="cvpro-right">
        <h2>{fields.fullName}</h2>
        <div className="section"><b>Kinh nghiệm làm việc</b><br />{fields.experience}</div>
        <div className="section"><b>Học vấn</b><br />{fields.education}</div>
        <div className="section"><b>Hoạt động</b><br />{fields.activity}</div>
        <div className="section"><b>Danh hiệu &amp; Giải thưởng</b><br />{fields.award}</div>
        <div className="section"><b>Chứng chỉ</b><br />{fields.certificate}</div>
        <div className="section"><b>Thông tin thêm</b><br />{fields.additional}</div>
        <div className="section"><b>Người giới thiệu</b><br />{fields.reference}</div>
      </div>
    </div>
  );

  const Ambition = () => (
    <div ref={previewRef} className="cv-preview-ambition editcv-preview">
      <div className="ambition-left">
        <Avatar cls="avatar" />
        <div className="ambition-name">{fields.fullName || "Tên"}</div>
        <div className="ambition-position">{fields.position || "Vị trí ứng tuyển"}</div>
        <div className="ambition-contact-block">
          <div className="contact-item"><span className="icon">📱</span>{fields.phone}</div>
          <div className="contact-item"><span className="icon">✉️</span>{fields.email}</div>
          <div className="contact-item"><span className="icon">🌐</span>{fields.website}</div>
          <div className="contact-item"><span className="icon">📍</span>{fields.address}</div>
        </div>
        <div className="ambition-section"><b>CÁC KỸ NĂNG</b><div>{fields.skills}</div></div>
        <div className="ambition-section"><b>SỞ THÍCH</b><div>{fields.hobbies}</div></div>
        <div className="ambition-section"><b>NGƯỜI GIỚI THIỆU</b><div>{fields.reference}</div></div>
        <div className="ambition-section"><b>THÔNG TIN THÊM</b><div>{fields.additional}</div></div>
      </div>
      <div className="ambition-right">
        <div className="ambition-objective">
          <div className="ambition-title">MỤC TIÊU NGHỀ NGHIỆP</div>
          <div>{fields.objective}</div>
        </div>
        <div className="ambition-section"><div className="ambition-title">KINH NGHIỆM LÀM VIỆC</div><div>{fields.experience}</div></div>
        <div className="ambition-section"><div className="ambition-title">HỌC VẤN</div><div>{fields.education}</div></div>
        <div className="ambition-section"><div className="ambition-title">DANH HIỆU &amp; GIẢI THƯỞNG</div><div>{fields.award}</div></div>
        <div className="ambition-section"><div className="ambition-title">CHỨNG CHỈ</div><div>{fields.certificate}</div></div>
        <div className="ambition-section"><div className="ambition-title">HOẠT ĐỘNG</div><div>{fields.activity}</div></div>
      </div>
    </div>
  );

  const Expert = () => (
    <div ref={previewRef} className="cv-preview-expert editcv-preview">
      <div className="expert-header">
        <div>
          <div className="expert-fullname">{fields.fullName || "Tên"}</div>
          <div className="expert-position">{fields.position || "Vị trí ứng tuyển"}</div>
        </div>
        <div className="expert-contact">
          <div>📞 {fields.phone}</div>
          <div>✉️ {fields.email}</div>
          <div>📍 {fields.address}</div>
        </div>
      </div>
      <div className="expert-section">
        <div className="expert-section-title">MỤC TIÊU NGHỀ NGHIỆP</div>
        <div className="expert-section-desc">{fields.objective}</div>
      </div>
      <div className="expert-section">
        <div className="expert-section-title">KINH NGHIỆM LÀM VIỆC</div>
        <div className="expert-section-desc">{fields.experience}</div>
      </div>
      <div className="expert-row">
        <div className="expert-col">
          <div className="expert-section-title">HỌC VẤN</div>
          <div className="expert-section-desc">{fields.education}</div>
        </div>
        <div className="expert-col">
          <div className="expert-section-title">CÁC KỸ NĂNG</div>
          <div className="expert-section-desc">{fields.skills}</div>
        </div>
      </div>
      <div className="expert-row">
        <div className="expert-col">
          <div className="expert-section-title">DANH HIỆU &amp; GIẢI THƯỞNG</div>
          <div className="expert-section-desc">{fields.award}</div>
        </div>
        <div className="expert-col">
          <div className="expert-section-title">CHỨNG CHỈ</div>
          <div className="expert-section-desc">{fields.certificate}</div>
        </div>
        <div className="expert-col">
          <div className="expert-section-title">NGƯỜI GIỚI THIỆU</div>
          <div className="expert-section-desc">{fields.reference}</div>
        </div>
      </div>
      <div className="expert-row">
        <div className="expert-col">
          <div className="expert-section-title">HOẠT ĐỘNG</div>
          <div className="expert-section-desc">{fields.activity}</div>
        </div>
        <div className="expert-col">
          <div className="expert-section-title">SỞ THÍCH</div>
          <div className="expert-section-desc">{fields.hobbies}</div>
        </div>
        <div className="expert-col">
          <div className="expert-section-title">THÔNG TIN THÊM</div>
          <div className="expert-section-desc">{fields.additional}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="editcv-container">
      <div className="editcv-form-side">
        <h2>Chỉnh sửa CV</h2>
        <form className="editcv-form">{renderForm()}</form>
        <button
          type="button"
          className="editcv-download-btn"
          onClick={handleDownloadPDF}
        >
          Tải về PDF
        </button>
      </div>
      <div className="editcv-preview-side">
        {id === "pro" && <Pro />}
        {id === "ambition" && <Ambition />}
        {id === "expert" && <Expert />}
      </div>
    </div>
  );
};

export default EditCVPage;
