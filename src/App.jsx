import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import FocusPage from "./pages/FocusPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study/:id/Focus" element={<FocusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
