import React from "react";
import styles from "./Emoji.module.scss";

function Emoji({ emoji, count, type = "default" }) {
  return (
    <section
      className={`${styles.emojiContainer} ${
        type === "general" ? styles.general : ""
      }`}
    >
      <span className={styles.emojiIcon}>{emoji}</span>
      <span className={styles.emojiCount}>{count}</span>
    </section>
  );
}

export default Emoji;
