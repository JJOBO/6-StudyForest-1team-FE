import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import FocusPage from "./pages/FocusPage.jsx"  // FocusPage로 변경

console.log(FocusPage)

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study/:id/focus" element={<FocusPage/>} />  {/* 상세 페이지 라우팅 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
