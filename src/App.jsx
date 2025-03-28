import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import FocusPage from "./pages/FocusPage";
import Home from "./pages/Home";

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
