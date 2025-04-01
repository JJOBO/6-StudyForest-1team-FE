import React from "react";
import "./StudyCard.scss"; // 스타일 파일 분리
import Point from "../../../Point"; // Point 컴포넌트 추가
import Emoji from "../../../Emoji"; // Emoji 컴포넌트 추가

function StudyCard({
  name,
  description,
  image,
  points,
  createdAt,
  emojis,
  calculateDays,
  background,
}) {
  const backgroundClass = background || "default";

  return (
    <div className={`study-card ${backgroundClass}`}>
      <img src={image} alt={name} className="study-image" />
      <div className="study-content">
        <div className="study-title">
          <h3>{name}</h3>
          <Point points={points} className="point" />
        </div>
        <p>{calculateDays(createdAt)}일째 진행 중</p>
        <p>{description}</p>
        <div className="study-stats">
          {emojis.map((emoji, index) => (
            <Emoji key={index} emoji={emoji.emoji} count={emoji.count} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
