import React, { useEffect } from "react"; // useEffect 추가
import styles from "./StudyDetail.module.scss";
import { useParams } from "react-router-dom";
import StudyResources from "../components/features/study/detail/StudyResources";
import HabitTracker from "../components/features/study/habit/HabitTracker";

function StudyDetail() {
  const { studyId } = useParams();

  useEffect(() => {
    // 로컬 스토리지에 스터디 ID를 저장하는 함수
    const saveRecentStudyId = (id) => {
      const recentStudyIds = JSON.parse(
        localStorage.getItem("recentStudyIds") || "[]"
      );
      // 중복 체크
      const index = recentStudyIds.indexOf(id);
      if (index !== -1) {
        recentStudyIds.splice(index, 1); // 기존 위치에서 제거
      }
      recentStudyIds.unshift(id); // 맨 앞에 추가
      if (recentStudyIds.length > 10) {
        // 최대 10개로 제한
        recentStudyIds.pop();
      }
      localStorage.setItem("recentStudyIds", JSON.stringify(recentStudyIds));
    };
    saveRecentStudyId(studyId);
  }, [studyId]);

  return (
    <div className={styles.studyDetailContainer}>
      <div className={styles.studyDetailContent}>
        <StudyResources studyId={studyId} />
        <HabitTracker studyId={studyId} />
      </div>
    </div>
  );
}

export default StudyDetail;
