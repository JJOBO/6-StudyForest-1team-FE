import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":studyId">
          <Route index element={<StudyPage />} />
          <Route path="habits" element={<HabitPage />} />
          <Route path="focus" element={<FocusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
