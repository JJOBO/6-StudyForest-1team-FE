import React from "react";
import "./StudyCard.scss"; // 스타일 파일 분리
import Point from "../common/Point"; // Point 컴포넌트 추가

function StudyCard({
  name,
  description,
  image,
  points,
  createdAt,
  emojis,
  calculateDays,
  userId, // userId 추가
}) {
  return (
    <div className="study-card">
      <img src={image} alt={name} className="study-image" />
      <div className="study-content">
        <h3>{name}</h3>
        <p>{calculateDays(createdAt)}일째 진행 중</p>
        <Point userId={userId} /> {/* Point 컴포넌트 사용 */}
        <p>{description}</p>
        <div className="study-stats">
          {emojis.map((emoji, index) => (
            <span key={index}>
              {emoji.emoji} {emoji.count} {/* emoji.emoji로 수정 */}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
