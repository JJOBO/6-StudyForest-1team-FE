import React from "react";
import "./FocusTimer.scss";

function FocusTimerDisplay({
  timeLeft,
  inputMinutes,
  inputSeconds,
  isEditingMinutes,
  isEditingSeconds,
  onChangeMinutes,
  onChangeSeconds,
  onClickMinutes,
  onClickSeconds,
  handleBlur,
  handleKeyDown,
}) {
  const absTime = Math.abs(timeLeft);
  const prefix = timeLeft < 0 ? "-" : "";
  const minutes = String(Math.floor(absTime / 60)).padStart(2, "0");
  const seconds = String(absTime % 60).padStart(2, "0");

  return (
    <div className="timer-display">
      {prefix}
      <span onClick={onClickMinutes}>
        {isEditingMinutes ? (
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => onChangeMinutes(e.target.value)}
            onBlur={() => handleBlur("minutes")}
            onKeyDown={(e) => handleKeyDown(e, "minutes")}
            autoFocus
          />
        ) : (
          minutes
        )}
      </span>
      :
      <span onClick={onClickSeconds}>
        {isEditingSeconds ? (
          <input
            type="number"
            value={inputSeconds}
            onChange={(e) => onChangeSeconds(e.target.value)}
            onBlur={() => handleBlur("seconds")}
            onKeyDown={(e) => handleKeyDown(e, "seconds")}
            autoFocus
          />
        ) : (
          seconds
        )}
      </span>
    </div>
  );
}

export default FocusTimerDisplay;
