import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudyDetail from "./pages/StudyDetail";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:studyId" element={<StudyDetail />} />
        <Route path="/:studyId/focus" element={<FocusPage />} />
        <Route path="/:studyId/habits" element={<HabitPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
