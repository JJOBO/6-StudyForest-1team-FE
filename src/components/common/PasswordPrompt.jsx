import React, { useState } from "react";
import styles from "./PasswordPrompt.module.scss"; // 비밀번호 프롬프트 스타일
import modificationButton from "../../assets/buttons/btn_modification/btn_modification_md.svg";
import visibilityOnIcon from "../../assets/buttons/btn_visibility/btn_visibility_on_24px.svg";
import visibilityOffIcon from "../../assets/buttons/btn_visibility/btn_visibility_off_24px.svg"; // 비밀번호 표시 아이콘
import confirmButton from "../../assets/buttons/btn_confirm/btn_confirm_lg.svg"; // 확인 버튼 아이콘

function PasswordPrompt({ studyTitle, onSubmit, onCancel, isDelete }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(password); // 부모 컴포넌트로 비밀번호 전달
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
              type={showPassword ? "text" : "password"} // 타입 변경
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
            <img
              src={isDelete ? confirmButton : modificationButton}
              alt={isDelete ? "확인" : "수정하러 가기"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordPrompt;
