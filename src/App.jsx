import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudyRegistration from "./pages/StudyRegistration";
import StudyDetail from "./pages/StudyDetail";
import FocusPage from "./pages/FocusPage";
import HabitPage from "./pages/HabitPage";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registration" element={<StudyRegistration />} />
          <Route path=":studyId" element={<StudyDetail />} />
          <Route path=":studyId/focus" element={<FocusPage />} />
          <Route path=":studyId/habits" element={<HabitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
