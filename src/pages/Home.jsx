import React from "react";
import GNB from "../components/layout/Header";
import styles from "./Home.module.scss";
import RecentStudy from "../components/features/study/home/RecentStud";
import StudyContents from "../components/features/study/home/StudyContents";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <GNB isButtonDisabled={false} />
      <RecentStudy />
      <StudyContents />
    </div>
  );
}

export default Home;
