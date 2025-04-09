import React from "react";
import styles from "./Point.module.scss";
import pointIcon from "../../assets/icons/ic_point.svg"; // 포인트 아이콘 경로 수정

function Point({ points, type = "dark" }) {
  return (
    <section
      className={`${styles.pointContainer} ${
        styles[`pointContainer--${type}`]
      }`}
    >
      <figure className={styles.pointIcon}>
        <img src={pointIcon} alt="Point Icon" />
      </figure>
      <figcaption className={styles.pointText}>{points}P 획득</figcaption>
    </section>
  );
}

export default Point;
