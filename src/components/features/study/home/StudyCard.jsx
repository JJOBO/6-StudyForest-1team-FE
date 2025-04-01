import React from "react";
import styles from "./StudyCard.module.scss"; // 스타일 파일 분리
import Point from "../../../common/Point"; // Point 컴포넌트 추가
import Emoji from "../../../common/Emoji"; // Emoji 컴포넌트 추가

function StudyCard({
  name,
  description,
  points,
  createdAt,
  emojis,
  calculateDays,
  background,
  creatorNick,
}) {
  const backgroundClass = styles[background] || styles.default;

  const darkBackgrounds = ["tablet", "laptop", "tile", "leaf"];
  const pointType = darkBackgrounds.includes(background) ? "dark" : "light";

  return (
    <div className={`${styles.studyCard} ${backgroundClass}`}>
      <div className={styles.studyContent}>
        <header>
          <div className={styles.studyTitle}>
            <h3>
              <span className={styles.creatorNick}>{creatorNick}</span>의 {name}
            </h3>
            <Point points={points} type={pointType} className={styles.point} />
          </div>
          <p>{calculateDays(createdAt)}일째 진행 중</p>
        </header>
        <p>{description}</p>
      </div>
      <div className={styles.studyStats}>
        {emojis.map((emoji, index) => (
          <Emoji key={index} emoji={emoji.emoji} count={emoji.count} />
        ))}
      </div>
    </div>
  );
}

export default StudyCard;
