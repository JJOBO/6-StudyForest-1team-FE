import React from "react";
import styles from "./Point.module.scss";
import pointIcon from "../../assets/icons/ic_point.svg";

function Point({ points }) {
  return (
    <div className={styles.pointContainer}>
      <span className={styles.pointIcon}>
        <img src={pointIcon} alt="Point Icon" />
      </span>
      <span className={styles.pointText}>{points}P 획득</span>
    </div>
  );
}

export default Point;
