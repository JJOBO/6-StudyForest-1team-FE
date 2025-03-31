// src/features/study/home/RecentStudy.jsx
import React, { useState, useEffect } from "react";
import studyAPI from "../studyAPI";
import "./RecentStudy.css";
import StudyCard from "../../../components/layout/StudyCard";
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
        const studyPromises = recentStudyIds.map(async (studyId) => {
          const studyDetail = await studyAPI.getStudyDetail(studyId);
          return studyDetail;
        });

        const studyDetails = await Promise.all(studyPromises);
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
    <div className="recent-study">
      <h2>최근 조회한 스터디</h2>
      <div className="study-cards">
        {recentStudies.length === 0 ? (
          <div>최근 조회한 스터디가 없습니다.</div>
        ) : (
          recentStudies.map((study) => (
            <Link
              to={`/${study.id}`}
              key={study.id}
              className="study-card-link"
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
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentStudy;
