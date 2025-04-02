/**
 * PasswordPrompt 컴포넌트
 *
 * Props:
 * - studyTitle (string): 모달 헤더에 표시할 스터디 제목.
 * - onSubmit (function): 비밀번호 제출 시 호출되는 콜백 함수.
 * - onCancel (function): 모달 취소 시 호출되는 콜백 함수.
 *
 * 사용법:
 * <PasswordPrompt
 *   studyTitle="스터디 제목"
 *   onSubmit={(password) => console.log(password)}
 *   onCancel={() => console.log("취소됨")}
 * />
 */

import React, { useState } from "react";
import styles from "./PasswordPrompt.module.scss";

import habitButton from "../../assets/buttons/btn_habit/btn_habit_md.svg";
import focusButton from "../../assets/buttons/btn_focus/btn_focus_md.svg";
import modificationButton from "../../assets/buttons/btn_modification/btn_modification_md.svg";
import confirmButton from "../../assets/buttons/btn_confirm/btn_confirm_lg.svg";
import visibilityOnIcon from "../../assets/buttons/btn_visibility/btn_visibility_on_24px.svg";
import visibilityOffIcon from "../../assets/buttons/btn_visibility/btn_visibility_off_24px.svg";

function PasswordPrompt({
  studyTitle,
  onSubmit,
  onCancel,
  actionType = "수정", // "삭제", "습관", "집중"
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getButtonImage = () => {
    if (actionType === "삭제") return confirmButton;
    if (actionType === "습관") return habitButton;
    if (actionType === "집중") return focusButton;
    return modificationButton; // 기본값
  };

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(password);
    } else {
      alert("비밀번호를 입력해주세요.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header>
          <h2>{studyTitle}</h2>
          <button onClick={onCancel}>나가기</button>
        </header>
        <p>권한이 필요해요!</p>
        <div className={styles.passwordInput}>
          <p>비밀번호</p>
          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleButton}
            >
              <img
                src={showPassword ? visibilityOnIcon : visibilityOffIcon}
                alt={showPassword ? "숨기기" : "보기"}
              />
            </button>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={handleSubmit} className={styles.modificationButton}>
            <img src={getButtonImage()} alt={`${actionType} 버튼`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordPrompt;
