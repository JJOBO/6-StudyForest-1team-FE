import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import HabitPage from "./pages/HabitPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="study">
          <Route path="habits" element={<HabitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
