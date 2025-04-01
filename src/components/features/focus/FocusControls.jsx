import React from "react";
import styles from "./FocusControls.module.scss";

function FocusControls({
  isRunning,
  isPaused,
  timeLeft,
  onClickStart,
  onClickPause,
  onClickStop,
  onClickReset,
}) {
  const hasCompleted = isRunning && timeLeft <= 0;
  const isActive = isRunning && !hasCompleted;

  return (
    <div className={styles.focusControls}>
      {isRunning && timeLeft > 0 && (
        <button
          className={styles.pauseBtn}
          onClick={onClickPause}
          aria-label={isPaused ? "resume" : "pause"}
        />
      )}

      <button
        className={`${styles.startBtn} ${
          hasCompleted ? styles.stop : styles.start
        } ${isActive ? styles.inactive : ""}`}
        onClick={hasCompleted ? onClickStop : onClickStart}
        aria-label={hasCompleted ? "stop" : "start"}
      />

      {isRunning && timeLeft > 0 && (
        <button
          className={styles.resetBtn}
          onClick={onClickReset}
          aria-label="restart"
        />
      )}
    </div>
  );
}

export default FocusControls;
