import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import cvTemplates from "../data/cvTemplates";
import "../styles/cvtemplate-preview.css"

type Fields = { [key: string]: string };

const EditCVPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const template = cvTemplates.find((t) => t.id === id);
  const [fields, setFields] = useState<Fields>(
    template
      ? Object.fromEntries(
          Object.entries(template.fields).map(([k, v]) => [k, v ?? ""])
        )
      : {}
  );
  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;
    axios.get(`/api/cv/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      if (res.data && res.data.fields) {
        setFields(res.data.fields);
      }
    }).catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      axios.post(`/api/cv/${id}`, { fields }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }, 1000);
  }, [fields, id]);

  if (!template) return <p>Không tìm thấy template</p>;

  // Lưu state khi blur khỏi vùng editable
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const key = e.currentTarget.getAttribute("data-key");
    if (!key) return;
    // Luôn lấy innerText an toàn, nếu null thì set ""
    const value = e.currentTarget.innerText ?? "";
    setFields((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };

  // Upload avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (!ev.target) return;
      setFields((prev) => ({ ...prev, avatar: ev.target!.result as string }));
    };
    reader.readAsDataURL(f);
  };

  // Xuất PDF full khung (fix nằm 1 góc)
  const downloadPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, backgroundColor: null });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${fields.fullName || "cv"}.pdf`);
  };

  // Component tái sử dụng cho vùng editable
  const E: React.FC<{
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    field: string;
    placeholder?: string;
    [key: string]: any;
  }> = ({
    tag: Tag = "div",
    className,
    field,
    placeholder,
    ...rest
  }) => (
    <Tag
      {...rest}
      className={className}
      contentEditable
      suppressContentEditableWarning
      data-key={field}
      onBlur={handleBlur as React.FocusEventHandler<any>}
      data-placeholder={placeholder}
    >
      {fields[field] || ""}
    </Tag>
  );

  const isHaveAvatar = id === "pro" || id === "ambition";

  return (
    <>
      {id === "pro" && (
        <div ref={previewRef} className="cv-preview-pro editcv-preview">
          <div className="cvpro-left">
            {isHaveAvatar && (
              <label className={`avatar-upload${fields.avatar ? " has-avatar" : ""}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${fields.avatar ||
                      "/avatar-default.png"})`,
                  }}
                />
              </label>
            )}
            <div>
              <b>Ngày sinh:</b> <E tag="span" field="dob" placeholder="DD/MM/YYYY" />
            </div>
            <div>
              <b>Giới tính:</b> <E tag="span" field="gender" placeholder="Nam/Nữ" />
            </div>
            <div>
              <b>SĐT:</b> <E tag="span" field="phone" placeholder="0123456789" />
            </div>
            <div>
              <b>Email:</b> <E tag="span" field="email" placeholder="you@ex.com" />
            </div>
            <div>
              <b>Địa chỉ:</b> <E tag="span" field="address" placeholder="Quận, TP" />
            </div>
            <div>
              <b>Website:</b> <E tag="span" field="website" placeholder="your.site" />
            </div>
            <h4>Mục tiêu nghề nghiệp</h4>
            <E
              tag="div"
              field="objective"
              placeholder="Viết mục tiêu…"
              className="full-block"
            />
            <h4>Kỹ năng</h4>
            <E
              tag="div"
              field="skills"
              placeholder="Liệt kê kỹ năng…"
              className="full-block"
            />
            <h4>Sở thích</h4>
            <E
              tag="div"
              field="hobbies"
              placeholder="Sở thích…"
              className="full-block"
            />
          </div>
          <div className="cvpro-right">
            <h2>
              <E
                tag="div"
                field="fullName"
                placeholder="Họ và tên"
                className="name-block"
              />
            </h2>
            <div className="section">
              <h4>Kinh nghiệm làm việc</h4>
              <E
                tag="div"
                field="experience"
                placeholder="Mô tả kinh nghiệm…"
                className="full-block"
              />
            </div>
            <div className="section">
              <h4>Học vấn</h4>
              <E
                tag="div"
                field="education"
                placeholder="Trường, ngành…"
                className="full-block"
              />
            </div>
            <div className="section">
              <h4>Hoạt động</h4>
              <E
                tag="div"
                field="activity"
                placeholder="Mô tả hoạt động…"
                className="full-block"
              />
            </div>
            <div className="section">
              <h4>Danh hiệu & Giải thưởng</h4>
              <E
                tag="div"
                field="award"
                placeholder="Giải thưởng…"
                className="full-block"
              />
            </div>
            <div className="section">
              <h4>Chứng chỉ</h4>
              <E
                tag="div"
                field="certificate"
                placeholder="Chứng chỉ…"
                className="full-block"
              />
            </div>
            <div className="section">
              <h4>Thông tin thêm</h4>
              <E
                tag="div"
                field="additional"
                placeholder="Ghi chú…"
                className="full-block"
              />
            </div>
            <div className="section">
              <h4>Người giới thiệu</h4>
              <E
                tag="div"
                field="reference"
                placeholder="Tên, chức vụ…"
                className="full-block"
              />
            </div>
          </div>
        </div>
      )}

      {id === "ambition" && (
        <div ref={previewRef} className="cv-preview-ambition editcv-preview">
          <div className="ambition-left">
            {isHaveAvatar && (
              <label className={`avatar-upload${fields.avatar ? " has-avatar" : ""}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${fields.avatar ||
                      "/avatar-default.png"})`,
                  }}
                />
              </label>
            )}
            <E
              tag="h2"
              className="ambition-name"
              field="fullName"
              placeholder="Họ và tên"
            />
            <E
              tag="div"
              className="ambition-position"
              field="position"
              placeholder="Vị trí ứng tuyển"
            />
            <div className="ambition-contact-block">
              {[
                ["📱", "phone"],
                ["✉️", "email"],
                ["🌐", "website"],
                ["📍", "address"],
              ].map(([icon, key]) => (
                <div className="contact-item" key={key}>
                  <span className="icon">{icon}</span>
                  <E tag="span" field={key} placeholder={icon} />
                </div>
              ))}
            </div>
            <h4>CÁC KỸ NĂNG</h4>
            <E
              tag="div"
              field="skills"
              placeholder="Liệt kê…"
              className="full-block"
            />
            <h4>SỞ THÍCH</h4>
            <E
              tag="div"
              field="hobbies"
              placeholder="Sở thích…"
              className="full-block"
            />
            <h4>NGƯỜI GIỚI THIỆU</h4>
            <E
              tag="div"
              field="reference"
              placeholder="Tên, chức vụ…"
              className="full-block"
            />
            <h4>THÔNG TIN THÊM</h4>
            <E
              tag="div"
              field="additional"
              placeholder="Ghi chú…"
              className="full-block"
            />
          </div>
          <div className="ambition-right">
            <h4 className="ambition-title">MỤC TIÊU NGHỀ NGHIỆP</h4>
            <E
              tag="div"
              field="objective"
              placeholder="Viết mục tiêu…"
              className="full-block"
            />
            {[
              ["KINH NGHIỆM LÀM VIỆC", "experience"],
              ["HỌC VẤN", "education"],
              ["DANH HIỆU & Giải thưởng", "award"],
              ["CHỨNG CHỈ", "certificate"],
              ["HOẠT ĐỘNG", "activity"],
            ].map(([label, key]) => (
              <div className="ambition-section" key={key}>
                <h4>{label}</h4>
                <E
                  tag="div"
                  field={key}
                  placeholder={label}
                  className="full-block"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {id === "expert" && (
        <div ref={previewRef} className="cv-preview-expert editcv-preview">
          <div className="expert-header">
            <div>
              <E
                tag="div"
                className="expert-fullname"
                field="fullName"
                placeholder="Họ và tên"
              />
              <E
                tag="div"
                className="expert-position"
                field="position"
                placeholder="Vị trí ứng tuyển"
              />
            </div>
            <div className="expert-contact">
              {[
                ["📞", "phone"],
                ["✉️", "email"],
                ["📍", "address"],
              ].map(([icon, key]) => (
                <div key={key}>
                  <span>{icon}</span>
                  <E tag="span" field={key} placeholder={icon} />
                </div>
              ))}
            </div>
          </div>
          <div className="expert-section">
            <h4>MỤC TIÊU NGHỀ NGHIỆP</h4>
            <E
              tag="div"
              field="objective"
              placeholder="Viết mục tiêu…"
              className="full-block"
            />
          </div>
          <div className="expert-section">
            <h4>KINH NGHIỆM LÀM VIỆC</h4>
            <E
              tag="div"
              field="experience"
              placeholder="Mô tả…"
              className="full-block"
            />
          </div>
          <div className="expert-row">
            <div className="expert-col">
              <h4>HỌC VẤN</h4>
              <E
                tag="div"
                field="education"
                placeholder="Trường…"
                className="full-block"
              />
            </div>
            <div className="expert-col">
              <h4>CÁC KỸ NĂNG</h4>
              <E
                tag="div"
                field="skills"
                placeholder="Kỹ năng…"
                className="full-block"
              />
            </div>
          </div>
          <div className="expert-row">
            <div className="expert-col">
              <h4>DANH HIỆU & Giải thưởng</h4>
              <E
                tag="div"
                field="award"
                placeholder="Giải thưởng…"
                className="full-block"
              />
            </div>
            <div className="expert-col">
              <h4>CHỨNG CHỈ</h4>
              <E
                tag="div"
                field="certificate"
                placeholder="Chứng chỉ…"
                className="full-block"
              />
            </div>
            <div className="expert-col">
              <h4>NGƯỜI GIỚI THIỆU</h4>
              <E
                tag="div"
                field="reference"
                placeholder="Giới thiệu…"
                className="full-block"
              />
            </div>
          </div>
          <div className="expert-row">
            <div className="expert-col">
              <h4>HOẠT ĐỘNG</h4>
              <E
                tag="div"
                field="activity"
                placeholder="Hoạt động…"
                className="full-block"
              />
            </div>
            <div className="expert-col">
              <h4>SỞ THÍCH</h4>
              <E
                tag="div"
                field="hobbies"
                placeholder="Sở thích…"
                className="full-block"
              />
            </div>
            <div className="expert-col">
              <h4>THÔNG TIN THÊM</h4>
              <E
                tag="div"
                field="additional"
                placeholder="Thông tin…"
                className="full-block"
              />
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", margin: 24 }}>
        <button className="download-btn" onClick={downloadPDF}>
          Tải về PDF
        </button>
      </div>
    </>
  );
};

export default EditCVPage;
