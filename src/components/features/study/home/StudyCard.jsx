import React from "react";
import styles from "./StudyCard.module.scss"; // 스타일 파일 분리
import Point from "../../../common/Point"; // Point 컴포넌트 추가
import Emoji from "../../../common/Emoji"; // Emoji 컴포넌트 추가

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
  const backgroundClass = styles[background] || styles.default;

  return (
    <div className={`${styles.studyCard} ${backgroundClass}`}>
      <div className={styles.studyContent}>
        <div className={styles.studyTitle}>
          <h3>{name}</h3>
          <Point points={points} type="light" className={styles.point} />
        </div>
        <p>{calculateDays(createdAt)}일째 진행 중</p>
        <p>{description}</p>
        <div className={styles.studyStats}>
          {emojis.map((emoji, index) => (
            <Emoji key={index} emoji={emoji.emoji} count={emoji.count} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
