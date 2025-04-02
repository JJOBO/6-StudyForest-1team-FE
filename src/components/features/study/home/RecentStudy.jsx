// src/features/study/home/RecentStudy.jsx
import React, { useState, useEffect } from "react";
import studyAPI from "../studyAPI";
import styles from "./RecentStudy.module.scss";
import StudyCard from "./StudyCard";
import { Link } from "react-router-dom"; // Link 추가

function RecentStudy() {
  const [recentStudies, setRecentStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentStudies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const recentStudyIds = JSON.parse(
          localStorage.getItem("recentStudyIds") || "[]"
        );

        if (recentStudyIds.length === 0) {
          setRecentStudies([]);
          setIsLoading(false);
          return;
        }

        // 스터디 ID 목록을 사용하여 스터디 정보를 가져옵니다.
        const validStudies = [];
        for (const studyId of recentStudyIds) {
          try {
            const studyDetail = await studyAPI.getStudyDetail(studyId);
            validStudies.push(studyDetail);
          } catch {
            // 해당 ID가 유효하지 않으면 무시
            console.warn(`Invalid study ID: ${studyId}`);
          }
        }

        setRecentStudies(validStudies);

        // 유효한 ID만 localStorage에 저장
        const validStudyIds = validStudies.map((study) => study.id);
        localStorage.setItem("recentStudyIds", JSON.stringify(validStudyIds));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentStudies();
  }, []);

  const calculateDays = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.recentStudy}>
      <h2>최근 조회한 스터디</h2>
      <div
        className={styles.studyCards}
        style={{
          overflowX: recentStudies.length > 3 ? "auto" : "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {recentStudies.length === 0 ? (
          <div className={styles.noStudies}>최근 조회한 스터디가 없습니다.</div>
        ) : (
          recentStudies.map((study) => (
            <Link
              to={`/${study.id}`}
              key={study.id}
              className={styles.studyCardLink}
            >
              <StudyCard
                key={study.id}
                name={study.name}
                description={study.description}
                image={study.background}
                points={study.totalPoints}
                createdAt={study.createdAt}
                emojis={study.emojis}
                calculateDays={calculateDays}
                background={study.background}
                creatorNick={study.creatorNick}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentStudy;
