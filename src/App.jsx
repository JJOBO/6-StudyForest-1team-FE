import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import FocusPage from "./pages/FocusPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study/:id/focus" element={<FocusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
