// src/pages/StudyDetail.jsx
import React, { useEffect } from "react"; // useEffect 추가
import "./StudyDetail.scss";
import { useParams } from "react-router-dom";
import GNB from "../components/layout/Header";
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
      if (!recentStudyIds.includes(id)) {
        recentStudyIds.unshift(id); // 맨 앞에 추가
        if (recentStudyIds.length > 3) {
          recentStudyIds.pop(); //
        }
        localStorage.setItem("recentStudyIds", JSON.stringify(recentStudyIds));
      }
    };
    saveRecentStudyId(studyId);
  }, [studyId]);

  return (
    <div className="study-detail-container">
      <GNB isButtonDisabled={false} />
      <div className="study-detail-content">
        <StudyResources studyId={studyId} />
        <HabitTracker studyId={studyId} />
      </div>
    </div>
  );
}

export default StudyDetail;
