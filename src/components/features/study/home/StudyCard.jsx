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
  isRecent = false, // isRecent prop 추가, 기본값은 false
}) {
  const backgroundClass = styles[background] || styles.default;

  const darkBackgrounds = ["tablet", "laptop", "tile", "leaf"];
  const pointType = darkBackgrounds.includes(background) ? "dark" : "light";
  // isRecent가 true일 경우, emojis 배열을 슬라이싱
  const displayedEmojis = isRecent ? emojis.slice(0, 3) : emojis;

  return (
    <article className={`${styles.studyCard} ${backgroundClass}`}>
      <section className={styles.studyContent}>
        <header>
          <div className={styles.studyTitle}>
            <h3>
              <span className={styles.creatorNick}>{creatorNick}</span> 의{" "}
              {name}
            </h3>
            <Point points={points} type={pointType} className={styles.point} />
          </div>
          <p>{calculateDays(createdAt)}일째 진행 중</p>
        </header>
        <p>{description}</p>
      </section>
      <footer className={styles.studyStats}>
        {displayedEmojis.map((emoji, index) => (
          <Emoji key={index} emoji={emoji.emoji} count={emoji.count} />
        ))}
      </footer>
    </article>
  );
}

export default StudyCard;
