import React from "react";
import styles from "./Home.module.scss";
import RecentStudy from "../components/features/study/home/RecentStudy";
import StudyContents from "../components/features/study/home/StudyContents";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <RecentStudy />
      <StudyContents />
    </div>
  );
}

export default Home;
