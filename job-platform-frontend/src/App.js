import { Routes, Route } from "react-router-dom"; // ❌ Không import BrowserRouter
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import ForgotPassword from "./views/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import FindJobPage from "./views/VIECLAM/FindJobPage";
import ITJobPage from "./views/VIECLAM/ITJobPage";
import ViecLamPhuHopPage from "./views/VIECLAM/ViecLamPhuHopPage";
import SeniorJobPage from "./views/VIECLAM/SeniorJobPage";
import CompanyListPage from "./views/VIECLAM/CompanyListPage";
import TopCompanyPage from "./views/VIECLAM/TopCompanyPage";
import TaoCVPage from "./views/HOSO_CV/TaoCVPage";
import TuVanCVPage from "./views/HOSO_CV/TuVanCVPage";
import HoSoCuaToiPage from "./views/HOSO_CV/HoSoCuaToiPage";
import CVSkillPage from "./views/CONGCU/CVSkillPage";
import ThueTNCNPage from "./views/CONGCU/ThueTNCNPage";
import BaoHiemPage from "./views/CONGCU/BAOHIEMPage";
import LuongPage from "./views/CONGCU/LUONGPage";
import LaiKepPage from "./views/CONGCU/TINHLAIKEPPage";
import TietKiemPage from "./views/CONGCU/KEHOACHTIETKIEMPage";
import TuVanNghePage from "./views/CAMNANG/TUVANNGHENGHIEPPage";
import XuHuongPage from "./views/CAMNANG/XUHUONGPage";
import CheDoLuongPage from "./views/CAMNANG/CHEDOLUONGPage";
import BiQuyetPage from "./views/CAMNANG/BIQUYETTIMVIECPage";
import ChuyenNganhPage from "./views/CAMNANG/KIENTHUCCHUYENNGANHPage";
import HanhTrangPage from "./views/CAMNANG/HANHTRANGNGHENGIEPPage";
import RecruiterRegisterPage from "./views/RecruiterRegisterPage";
import JobPage from "./views/VIECLAM/JobPage";
import HSCVPage from "./views/HOSO_CV/HoSoCVPage";
import CongCuPage from "./views/CONGCU/CongCuPage";
import CamNangPage from "./views/CAMNANG/CamNangPage";
import Employer from "./views/Employer";


function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/viec-lam" element={<JobPage />} />
      <Route path="/find-jobs" element={<FindJobPage />} />
      <Route path="/it-jobs" element={<ITJobPage />} />
      <Route path="/viec-lam-phu-hop" element={<ViecLamPhuHopPage />} />
      <Route path="/senior-jobs" element={<SeniorJobPage />} />
      <Route path="/company-list" element={<CompanyListPage />} />
      <Route path="/top-company" element={<TopCompanyPage />} />
      <Route path="/ho-so-cv" element={<HSCVPage />} />
      <Route path="/tao-cv" element={<TaoCVPage />} />
      <Route path="/tu-van-cv" element={<TuVanCVPage />} />
      <Route path="/your-cv" element={<HoSoCuaToiPage />} />
      <Route path="/cong-cu" element={<CongCuPage/>} />
      <Route path="/cv-skill" element={<CVSkillPage />} />
      <Route path="/thue-tncn" element={<ThueTNCNPage />} />
      <Route path="/tinh-baohiem" element={<BaoHiemPage />} />
      <Route path="/tinh-luong" element={<LuongPage />} />
      <Route path="/tinh-lai-kep" element={<LaiKepPage />} />
      <Route path="/ke-hoach-tiet-kiem" element={<TietKiemPage />} />
      <Route path="/cam-nang" element={<CamNangPage/>} />
      <Route path="/tu-van-nghe-nghiep" element={<TuVanNghePage/>} />
      <Route path="/thi-truong-va-xu-huong" element={<XuHuongPage/>} />
      <Route path="/che-do-luong" element={<CheDoLuongPage/>} />
      <Route path="/bi-quyet-tim-viec" element={<BiQuyetPage/>} />
      <Route path="/kien-thuc-chuyen-nganh" element={<ChuyenNganhPage/>} />
      <Route path="hanh-trang-nghe-nghiep" element={<HanhTrangPage/>} />
      <Route path="/dang-ky-nha-tuyen-dung" element={<RecruiterRegisterPage />} />
      <Route path="/employer" element={<Employer />} />
      
    </Routes>
    </AuthProvider>
      
  );
}

export default App;
