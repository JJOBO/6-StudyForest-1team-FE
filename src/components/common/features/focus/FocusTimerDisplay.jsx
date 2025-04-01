import React, { useEffect } from "react";
import "./FocusTimer.scss";

function FocusTimerDisplay({
  timeLeft,
  isRunning,
  inputMinutes,
  inputSeconds,
  isEditingMinutes,
  isEditingSeconds,
  setInputMinutes,
  setInputSeconds,
  onClickMinutes,
  onClickSeconds,
  onChangeMinutes,
  onChangeSeconds,
  handleBlur,
  handleKeyDown,
}) {
  const absTime = Math.abs(timeLeft);
  const prefix = timeLeft < 0 ? "-" : "";
  const minutes = String(Math.floor(absTime / 60)).padStart(2, "0");
  const seconds = String(absTime % 60).padStart(2, "0");

  useEffect(() => {
    if (isEditingMinutes) setInputMinutes(minutes);
    if (isEditingSeconds) setInputSeconds(seconds);
  }, [isEditingMinutes, isEditingSeconds]);

  const renderTimeInput = (type, value, isEditing, onClick, onChange) => {
    const displayValue = isEditing
      ? value
      : type === "minutes"
      ? minutes
      : seconds;

    return (
      <input
        type="text"
        id={type}
        className="time-input"
        value={displayValue}
        readOnly={!isEditing || isRunning}
        onClick={() => {
          if (!isRunning) onClick();
        }}
        onChange={(e) => {
          const onlyNum = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 값 삭제
          if (onlyNum.length <= 2) onChange(onlyNum);
        }}
        onBlur={() => handleBlur(type)}
        onKeyDown={(e) => handleKeyDown(e, type)}
      />
    );
  };

  // 상태에 따른 클래스 계산
  const timerdisplayClass = [
    "focus-timer-display",
    timeLeft < 0
      ? "focus-timer-negative"
      : isRunning && timeLeft <= 10
      ? "focus-timer-warning"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={timerdisplayClass}>
      {prefix}
      {renderTimeInput(
        "minutes",
        inputMinutes,
        isEditingMinutes,
        onClickMinutes,
        onChangeMinutes
      )}
      <p className="colon">:</p>
      {renderTimeInput(
        "seconds",
        inputSeconds,
        isEditingSeconds,
        onClickSeconds,
        onChangeSeconds
      )}
    </div>
  );
}

export default FocusTimerDisplay;
