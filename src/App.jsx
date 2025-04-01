import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import StudyRegistration from "./pages/StudyRegistration";
import StudyDetail from "./pages/StudyDetail";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<StudyRegistration />} />
        <Route path="/:studyId" element={<StudyDetail />} />
        <Route path="/:studyId/focus" element={<FocusPage />} />
        <Route path="/:studyId/habits" element={<HabitPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
