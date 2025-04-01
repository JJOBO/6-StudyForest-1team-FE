import React from "react";
import styles from "./Emoji.module.scss";

function Emoji({ emoji, count }) {
  return (
    <div className={styles.emojiContainer}>
      <span className={styles.emojiIcon}>{emoji}</span>
      <span className={styles.emojiCount}>{count}</span>
    </div>
  );
}

export default Emoji;
