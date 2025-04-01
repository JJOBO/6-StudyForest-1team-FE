import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import focusAPI from "./focusAPI";
import FocusTimerDisplay from "./FocusTimerDisplay";
import FocusControls from "./FocusControls";
import "./FocusTimer.scss";

function FocusTimer({ setTotalPoints }) {
  const { studyId } = useParams();

  // 상태관리
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [pauseStartTime, setPauseStartTime] = useState(null);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [isEditingMinutes, setIsEditingMinutes] = useState(false);
  const [isEditingSeconds, setIsEditingSeconds] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000); // 1초씩 감소
    }
    return () => clearInterval(timer); // 타이머 중단
  }, [isRunning, isPaused]);

  /** 목표 집중 시간 계산 */
  const getTargetTime = () => {
    const minutes = parseInt(inputMinutes, 10) || 0;
    const seconds = parseInt(inputSeconds, 10) || 0;
    return minutes * 60 + seconds;
  };

  /** 뱃지에 들어갈 목표 집중 시간 */
  const formatTargetTime = () => {
    const total = getTargetTime();
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const updateTimeLeft = () => setTimeLeft(getTargetTime());

  /** 타이머 시작 */
  const handleClickStartTimer = async () => {
    if (timeLeft <= 0 && isRunning) return handleClickStopTimer();
    const targetTime = getTargetTime();
    if (targetTime <= 0) return alert("올바른 시간을 입력하세요!");

    try {
      await focusAPI.startFocus(studyId, targetTime);
      setTimeLeft(targetTime);
      setStartTime(Date.now());
      setIsRunning(true);
    } catch (error) {
      console.error("타이머 시작 오류:", error);
    }
  };

  /** 타이머 일시정지 */
  const handleClickPauseTimer = () => {
    if (isPaused) {
      setPausedDuration((prev) => prev + (Date.now() - pauseStartTime));
      setPauseStartTime(null);
    } else {
      setPauseStartTime(Date.now());
    }
    setIsPaused((prev) => !prev);
  };

  /** 타이머 중지 */
  const handleClickStopTimer = async () => {
    setIsRunning(false);
    const elapsedTime = Math.floor(
      (Date.now() - startTime - pausedDuration) / 1000
    );

    try {
      const res = await focusAPI.stopFocus(studyId, elapsedTime, timeLeft);
      setTotalPoints((prev) => prev + res.focusPoints);
      alert(`${res.focusPoints} 포인트를 획득했습니다!`);
      handleClickResetTimer();
    } catch (error) {
      console.error("타이머 중지 오류:", error);
    }
  };

  /** 타이머 초기화 */
  const handleClickResetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setInputMinutes("");
    setInputSeconds("");
    setPausedDuration(0);
    setPauseStartTime(null);
    setStartTime(null);
    setIsEditingMinutes(false);
    setIsEditingSeconds(false);
  };

  return (
    <div className="focus-timer-wrapper">
      <div className="focus-timer-title">오늘의 집중</div>

      <div className={`focus-timer-badge ${isRunning ? "" : "hidden"}`}>
        <div className="timer-icon" />
        <span className="target-timer-text">{formatTargetTime()}</span>
      </div>

      <FocusTimerDisplay
        timeLeft={timeLeft}
        inputMinutes={inputMinutes}
        inputSeconds={inputSeconds}
        isEditingMinutes={isEditingMinutes}
        isEditingSeconds={isEditingSeconds}
        setInputMinutes={setInputMinutes}
        setInputSeconds={setInputSeconds}
        onClickMinutes={() => setIsEditingMinutes(true)}
        onClickSeconds={() => setIsEditingSeconds(true)}
        onChangeMinutes={setInputMinutes}
        onChangeSeconds={setInputSeconds}
        handleBlur={(type) => {
          if (type === "minutes") setIsEditingMinutes(false);
          if (type === "seconds") setIsEditingSeconds(false);
          updateTimeLeft();
        }}
        handleKeyDown={(e, type) => {
          if (e.key === "Enter") {
            if (type === "minutes") setIsEditingMinutes(false);
            if (type === "seconds") setIsEditingSeconds(false);
            updateTimeLeft();
          }
        }}
        isRunning={isRunning}
      />

      <FocusControls
        isRunning={isRunning}
        isPaused={isPaused}
        timeLeft={timeLeft}
        onClickStart={handleClickStartTimer}
        onClickPause={handleClickPauseTimer}
        onClickStop={handleClickStopTimer}
        onClickReset={handleClickResetTimer}
      />
    </div>
  );
}

export default FocusTimer;
