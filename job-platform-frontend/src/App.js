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

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/find-jobs" element={<FindJobPage />} />
      <Route path="/it-jobs" element={<ITJobPage />} />
      <Route path="/viec-lam-phu-hop" element={<ViecLamPhuHopPage />} />
      <Route path="/senior-jobs" element={<SeniorJobPage />} />
      <Route path="/company-list" element={<CompanyListPage />} />
      <Route path="/top-company" element={<TopCompanyPage />} />
      <Route path="/tao-cv" element={<TaoCVPage />} />
      <Route path="/tu-van-cv" element={<TuVanCVPage />} />
      <Route path="/your-cv" element={<HoSoCuaToiPage />} />
      <Route path="/cv-skill" element={<CVSkillPage />} />
      <Route path="/thue-tncn" element={<ThueTNCNPage />} />
      <Route path="/tinh-baohiem" element={<BaoHiemPage />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
