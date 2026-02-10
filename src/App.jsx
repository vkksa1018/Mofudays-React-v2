import { Routes, Route } from "react-router-dom";

// 引入頁面元件
import Home from "./pages/Home/Home";
import Faq from "./pages/Faq/Faq";

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/signup" element={<div>這是註冊頁面</div>} />
        <Route path="/pet-info" element={<div>這是毛孩資訊頁面</div>} />
      </Routes>
    </div>
  );
}

export default App;
