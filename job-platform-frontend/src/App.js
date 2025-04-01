import { Routes, Route } from "react-router-dom"; // ❌ Không import BrowserRouter
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
