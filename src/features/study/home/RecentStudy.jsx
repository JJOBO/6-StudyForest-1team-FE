// src/features/study/home/RecentStudy.jsx
import React, { useState, useEffect } from "react";
import studyAPI from "../studyAPI";
import "./RecentStudy.css";

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

        const data = await studyAPI.getStudyList(
          "",
          "createdAt",
          0,
          recentStudyIds
        );
        setRecentStudies(data.recentStudies);
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
            <div key={study.id} className="study-card">
              <div className="study-content">
                <h3>{study.name}</h3>
                <p>{calculateDays(study.createdAt)}일째 진행 중</p>
                <p>{study.totalPoints}P 획득</p>
                <p>{study.description}</p>
                <div className="study-stats">
                  {study.emojis.map((emoji, index) => (
                    <span key={index}>
                      {emoji.emoji} {emoji.count}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentStudy;
