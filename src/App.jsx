import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import HabitPage from "./pages/HabitPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":studyId/habits" element={<HabitPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
