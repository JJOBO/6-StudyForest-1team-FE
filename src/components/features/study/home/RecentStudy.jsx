import React, { useState, useEffect } from "react";
import studyAPI from "../studyAPI";
import styles from "./RecentStudy.module.scss";
import StudyCard from "./StudyCard";
import { Link } from "react-router-dom";

function RecentStudy() {
  const [recentStudies, setRecentStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentStudies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let recentStudyIds = JSON.parse(
          localStorage.getItem("recentStudyIds") || "[]"
        );
        if (recentStudyIds.length === 0) {
          setRecentStudies([]);
          setIsLoading(false);
          return;
        }

        const validStudyIds = []; // 유효한 스터디 ID를 저장할 배열
        const studyPromises = recentStudyIds.map(async (studyId) => {
          if (!studyId) {
            return null;
          }
          try {
            const studyDetail = await studyAPI.getStudyDetail(studyId);
            validStudyIds.push(studyId); // 유효한 ID 추가
            return studyDetail;
          } catch (err) {
            // 스터디를 찾을 수 없는 경우 (삭제된 경우)
            console.error(`스터디 ID ${studyId}를 찾을 수 없습니다.`, err);
            return null; // 유효하지 않은 ID는 무시
          }
        });

        const studyDetails = (await Promise.all(studyPromises)).filter(
          (study) => study !== null
        );

        // 유효하지 않은 ID를 제거한 후 로컬 스토리지 업데이트
        localStorage.setItem("recentStudyIds", JSON.stringify(validStudyIds));
        setRecentStudies(studyDetails);
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
