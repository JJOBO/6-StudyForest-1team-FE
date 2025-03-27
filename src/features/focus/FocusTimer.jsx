import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import focusAPI from "./focusAPI";

function FocusTimer({ userTotalPoints }) {
  const { id: studyId } = useParams();

  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [pauseStartTime, setPauseStartTime] = useState(null);
  const [totalPoints, setTotalPoints] = useState(userTotalPoints);
  const [currentSessionPoints, setCurrentSessionPoints] = useState(0);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");

  // MM:SS 형식 변환 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(Math.abs(seconds) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (Math.abs(seconds) % 60).toString().padStart(2, "0");
    return `${seconds < 0 ? "-" : ""}${minutes}:${secs}`;
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning && !isTimerPaused) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, isTimerPaused]);

  // 집중 시작: POST 요청
  const handleStartFocus = async () => {
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    const targetTime = minutes * 60 + seconds;

    if (targetTime <= 0) {
      alert("올바른 시간을 입력하세요!");
      return;
    }

    try {
      await focusAPI.startFocus(studyId, targetTime);
      setRemainingTime(targetTime);
      setStartTime(Date.now());
      setIsTimerRunning(true);
    } catch (error) {
      console.error("Error starting focus:", error);
      if (error.response && error.response.status === 401) {
        alert("비밀번호가 올바르지 않습니다. 다시 인증해주세요.");
      }
    }
  };

  // 일시정지/재개
  const handlePauseFocus = () => {
    if (isTimerPaused) {
      setPausedDuration((prev) => prev + (Date.now() - pauseStartTime));
      setPauseStartTime(null);
    } else {
      setPauseStartTime(Date.now());
    }
    setIsTimerPaused(!isTimerPaused);
  };

  // 집중 종료: PUT 요청 (백엔드 URL 명시)
  const handleStopFocus = async () => {
    setIsTimerRunning(false);

    let totalPausedTime = pausedDuration;
    if (isTimerPaused && pauseStartTime) {
      totalPausedTime += Date.now() - pauseStartTime;
    }
    const elapsedTime = Math.floor(
      (Date.now() - startTime - totalPausedTime) / 1000
    );

    try {
      const data = await focusAPI.stopFocus(
        studyId,
        elapsedTime,
        remainingTime
      );
      setCurrentSessionPoints(data.focusPoints);
      setTotalPoints(data.totalPoints);
      alert(`${data.focusPoints} 포인트를 획득했습니다!`);

      // 초기화
      setRemainingTime(0);
      setPausedDuration(0);
      setPauseStartTime(null);
      setStartTime(null);
      setIsTimerPaused(false);
      setInputMinutes("");
      setInputSeconds("");
    } catch (error) {
      console.error("Error stopping focus:", error);
      if (error.response && error.response.status === 401) {
        alert("비밀번호가 올바르지 않습니다. 다시 인증해주세요.");
      }
    }
  };

  return (
    <div>
      <h1>{formatTime(remainingTime)}</h1>
      <div>
        <input // 삭제 예정
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
          placeholder="분"
          disabled={isTimerRunning}
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
          placeholder="초"
          disabled={isTimerRunning}
        />
      </div>
      <button onClick={handleStartFocus} disabled={isTimerRunning}>
        시작
      </button>
      <button onClick={handlePauseFocus} disabled={!isTimerRunning}>
        {isTimerPaused ? "재개" : "일시정지"}
      </button>
      <button onClick={handleStopFocus} disabled={!isTimerRunning}>
        중지
      </button>
      <h2>획득 포인트: {currentSessionPoints}</h2>
      <h2>총 포인트: {totalPoints}</h2>
    </div>
  );
}

export default FocusTimer;
