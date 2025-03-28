import React from "react";
import "./StudyCard.scss"; // 스타일 파일 분리

function StudyCard({
  name,
  description,
  image,
  points,
  createdAt,
  emojis,
  calculateDays,
}) {
  return (
    <div className="study-card">
      <img src={image} alt={name} className="study-image" />
      <div className="study-content">
        <h3>{name}</h3>
        <p>{calculateDays(createdAt)}일째 진행 중</p>
        <p>{points}P 획득</p>
        <p>{description}</p>
        <div className="study-stats">
          {emojis.map((emoji, index) => (
            <span key={index}>
              {emoji.type} {emoji.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
