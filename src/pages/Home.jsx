import React from "react";
import GNB from "../components/GlobalNavigationBar";
import "./Home.css"; // CSS 파일 추가
import RecentStudy from "../features/study/home/RecentStudy";
import StudyContents from "../features/study/home/StudyContents";

function Home() {
  return (
    <div className="home-container">
      <GNB />
      <RecentStudy />
      <StudyContents />
    </div>
  );
}

export default Home;
