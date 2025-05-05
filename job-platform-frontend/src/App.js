import { Routes, Route } from "react-router-dom"; // ❌ Không import BrowserRouter
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import ForgotPassword from "./views/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import ViecLamPhuHopPage from "./views/VIECLAM/ViecLamPhuHopPage";
import CompanyListPage from "./views/VIECLAM/CompanyListPage";
import TopCompanyPage from "./views/VIECLAM/TopCompanyPage";
import TaoCVPage from "./views/HOSO_CV/TaoCVPage";
import HoSoCuaToiPage from "./views/HOSO_CV/HoSoCuaToiPage";
import ThueTNCNPage from "./views/CONGCU/ThueTNCNPage";
import BaoHiemThatNghiepPage from "./views/CONGCU/BAOHIEMTHATNGHIEPPage";
import LuongPage from "./views/CONGCU/LUONGPage";
import TuVanNghePage from "./views/CAMNANG/TUVANNGHENGHIEPPage";
import XuHuongPage from "./views/CAMNANG/XUHUONGPage";
import CheDoLuongPage from "./views/CAMNANG/CHEDOLUONGPage";
import BiQuyetPage from "./views/CAMNANG/BIQUYETTIMVIECPage";
import ChuyenNganhPage from "./views/CAMNANG/KIENTHUCCHUYENNGANHPage";
import HanhTrangPage from "./views/CAMNANG/HANHTRANGNGHENGIEPPage";
import RecruiterRegisterPage from "./views/RecruiterRegisterPage";
import HuongDanVietCVPage from "./views/HOSO_CV/HuongDanVietCV";
import CamNangPage from "./views/CAMNANG/CamNangPage";
import Employer from "./views/Employer";
import JobPostForm from "./views/JobPostForm";
import AdminJobApproval from "./views/AdminJobApproval";
import QuanLyCVPage from "./views/HOSO_CV/QuanLyCVPage";
import CompanyDetailPage from "./views/VIECLAM/CompanyDetailPage";
import EditCVPage from "./views/HOSO_CV/EditCVPage";
import CvLaGi from "./views/Footer/CvLaGi";
import CachVietCV from "./views/Footer/CachVietCV";
import CVXinViecLaGi from './views/Footer/CVXinViecLaGi';
import ApplyPage from "./views/VIECLAM/ApplyPage";
function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/viec-lam" element={<HomePage />} />
      <Route path="/viec-lam-phu-hop" element={<ViecLamPhuHopPage />} />
      <Route path="/company-list" element={<CompanyListPage />} />
      <Route path="/top-company" element={<TopCompanyPage />} />
      <Route path="/mau-cv" element={<TaoCVPage />} />
      <Route path="/huong-dan-viet-cv" element={<HuongDanVietCVPage />} />
      <Route path="/quan-ly-cv" element={<QuanLyCVPage />} />
      <Route path="/your-cv" element={<HoSoCuaToiPage />} />
      <Route path="/thue-tncn" element={<ThueTNCNPage />} />
      <Route path="/tinh-bao-hiem-that-nghiep" element={<BaoHiemThatNghiepPage />} />
      <Route path="/tinh-luong" element={<LuongPage />} />
      <Route path="/cam-nang" element={<CamNangPage/>} />
      <Route path="/tu-van-nghe-nghiep" element={<TuVanNghePage/>} />
      <Route path="/thi-truong-va-xu-huong" element={<XuHuongPage/>} />
      <Route path="/che-do-luong" element={<CheDoLuongPage/>} />
      <Route path="/bi-quyet-tim-viec" element={<BiQuyetPage/>} />
      <Route path="/kien-thuc-chuyen-nganh" element={<ChuyenNganhPage/>} />
      <Route path="hanh-trang-nghe-nghiep" element={<HanhTrangPage/>} />
      <Route path="/dang-ky-nha-tuyen-dung" element={<RecruiterRegisterPage />} />  
      <Route path="/employer" element={<Employer />} />
      <Route path="/job-post-form" element={<JobPostForm />} />
      <Route path="/admin/job-approval" element={<AdminJobApproval />} />
      <Route path="/company/:id" element={<CompanyDetailPage />} />
      <Route path="/quan-ly-cv/:id" element={<EditCVPage />} />
      <Route path="/cv-la-gi" element={<CvLaGi />} />
      <Route path="/cach-viet-cv" element={<CachVietCV />} />
      <Route path="/cv-xin-viec" element={<CVXinViecLaGi />} />
      <Route path="/apply/:id" element={<ApplyPage />} />

    </Routes>
    </AuthProvider>
  );
}

export default App;