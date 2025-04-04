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

import visibilityOnIcon from "../../assets/buttons/btn_visibility/btn_visibility_on_24px.svg";
import visibilityOffIcon from "../../assets/buttons/btn_visibility/btn_visibility_off_24px.svg";
import { toast } from "react-toastify";

function PasswordPrompt({
  studyTitle,
  onSubmit,
  onCancel,
  buttonLabel, // "삭제", "습관", "집중"
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <button
            onClick={() => {
              toast.dismiss();
              onCancel();
            }}
          >
            나가기
          </button>
        </header>
        <p>권한이 필요해요!</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.passwordInput}>
            <p>비밀번호</p>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  toast.dismiss();
                  setPassword(e.target.value);
                }}
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
            <button type="submit" className={`${styles.modalButton}`}>
              {buttonLabel}
            </button>
          </div>
          <button
            type="button"
            className={styles.exitButtonMobile}
            onClick={() => {
              toast.dismiss();
              onCancel();
            }}
          >
            나가기
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordPrompt;
