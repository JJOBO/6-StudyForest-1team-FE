import React from "react";
import styles from "./Point.module.scss";
import pointIcon from "../../assets/icons/ic_point.svg"; // 포인트 아이콘 경로 수정

function Point({ points, type = "dark" }) {
  return (
    <div
      className={`${styles.pointContainer} ${
        styles[`pointContainer--${type}`]
      }`}
    >
      <span className={styles.pointIcon}>
        <img src={pointIcon} alt="Point Icon" />
      </span>
      <span className={styles.pointText}>{points}P 획득</span>
    </div>
  );
}

export default Point;
