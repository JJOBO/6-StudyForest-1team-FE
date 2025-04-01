import React, { useEffect, useState } from "react";
import studyAPI from "../studyAPI";
import { Link } from "react-router-dom";
import Point from "../../../Point";
import Emoji from "../../../Emoji"; // Emoji 컴포넌트 추가
import "./StudyResources.scss"; // CSS 파일 추가

function StudyResources({ studyId }) {
  const [studyDetail, setStudyDetail] = useState(null);

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const data = await studyAPI.getStudyDetail(studyId);
        setStudyDetail(data);
      } catch (error) {
        console.error("Failed to fetch study detail:", error);
      }
    };

    if (studyId) {
      fetchStudyDetail();
    }
  }, [studyId]);

  return (
    <div>
      {studyDetail ? (
        <div>
          <div className="study-header">
            <div className="study-emojis">
              {studyDetail.emojis.map((emoji, index) => (
                <Emoji key={index} emoji={emoji.emoji} count={emoji.count} />
              ))}
            </div>
            <div className="study-options">
              <p>공유하기</p>
              <p>|</p>
              <p>수정하기</p>
              <p>|</p>
              <p>스터디 삭제하기</p>
            </div>
          </div>
          <div className="study-container">
            <div className="study-title">
              <h1>
                {studyDetail.creatorNick}의 {studyDetail.name}
              </h1>
              <div>
                <Link to={`/${studyId}/habits`}>
                  <button>오늘의 습관</button>
                </Link>
                <Link to={`/${studyId}/focus`}>
                  <button>오늘의 집중</button>
                </Link>
              </div>
            </div>
            <div className="study-description">
              <p>소개</p>
              <p>{studyDetail.description}</p>
            </div>
            <div className="study-points">
              <p>현재까지 획득한 포인트</p>
              <Point points={studyDetail.totalPoints} className="point" />
            </div>
          </div>
        </div>
      ) : (
        <p>스터디 디테일 로딩중...</p>
      )}
    </div>
  );
}

export default StudyResources;
