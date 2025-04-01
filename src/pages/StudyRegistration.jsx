import React, { useState } from "react";
import styles from "./StudyRegistration.module.scss";
import studyAPI from "../features/study/studyAPI";
import { useNavigate } from "react-router-dom";

function StudyRegistration() {
  const [studyName, setStudyName] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [background, setBackground] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const backgrounds = [
    { color: "#E1EDDE", name: "green" },
    { color: "#FFF1CC", name: "yellow" },
    { color: "#E0F1F5", name: "blue" },
    { color: "#FDE0E9", name: "pink" },
    { color: "tablet", name: "tablet" },
    { color: "laptop", name: "laptop" },
    { color: "tile", name: "tile" },
    { color: "leaf", name: "leaf" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!studyName) validationErrors.studyName = "스터디 이름을 입력해주세요";
    if (!nickname) validationErrors.nickname = "닉네임을 입력해주세요";
    if (!description)
      validationErrors.description = "소개 멘트를 작성해주세요.";
    if (!password) validationErrors.password = "비밀번호를 입력해주세요.";
    if (password !== confirmPassword)
      validationErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    if (!background) validationErrors.background = "배경을 선택해주세요.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // 선택된 배경의 이름을 찾음
      const selectedBackground = backgrounds.find(
        (bg) => bg.color === background
      );
      const backgroundName = selectedBackground
        ? selectedBackground.name
        : background;

      const studyData = {
        name: studyName,
        creatorNick: nickname,
        description: description,
        password: password,
        passwordConfirm: confirmPassword,
        background: backgroundName, // 파일명 저장
      };
      const response = await studyAPI.createStudy(studyData);
      console.log("Study created:", response);
      // 스터디 생성 후, 로컬 스토리지에 배경 저장
      localStorage.setItem(`studyBackground-${response.id}`, background);
      navigate(`/${response.id}`);
    } catch (error) {
      console.error("Failed to create study:", error);

      setErrors({ api: "스터디 생성에 실패했습니다." });
    }
  };

  return (
    <div className={styles.studyRegistrationPageLayout}>
      <div className={styles.studyRegistration}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2>스터디 만들기</h2>
          {errors.api && <span className={styles.errorText}>{errors.api}</span>}
          <div
            className={`${styles.inputGroup} ${
              errors.nickname ? styles.error : ""
            }`}
          >
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={errors.nickname ? styles.error : ""}
            />
            {errors.nickname && (
              <span className={styles.errorText}>{errors.nickname}</span>
            )}
          </div>
          <div
            className={`${styles.inputGroup} ${
              errors.studyName ? styles.error : ""
            }`}
          >
            <label htmlFor="studyName">스터디 이름</label>
            <input
              id="studyName"
              type="text"
              placeholder="스터디 이름을 입력해주세요"
              value={studyName}
              onChange={(e) => setStudyName(e.target.value)}
              className={errors.studyName ? styles.error : ""}
            />
            {errors.studyName && (
              <span className={styles.errorText}>{errors.studyName}</span>
            )}
          </div>
          <div
            className={`${styles.inputGroup} ${
              errors.description ? styles.error : ""
            }`}
          >
            <label htmlFor="description">소개</label>
            <textarea
              id="description"
              placeholder="소개 멘트를 작성해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? styles.error : ""}
            ></textarea>
            {errors.description && (
              <span className={styles.errorText}>{errors.description}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label>배경을 선택해주세요</label>
            <div className={styles.backgroundSelection}>
              {backgrounds.map((bg, index) => (
                <div
                  key={index}
                  className={`${styles.bgOption} ${
                    background === bg.color ? styles.selected : ""
                  }`}
                  onClick={() => setBackground(bg.color)}
                >
                  {typeof bg.color === "string" && bg.color.startsWith("#") ? (
                    <div
                      className={styles.colorBg}
                      style={{ backgroundColor: bg.color }}
                    ></div>
                  ) : (
                    <img
                      src={"/src/assets/background/" + bg.color + ".jpg"}
                      alt="background"
                    />
                  )}
                </div>
              ))}
            </div>
            {errors.background && (
              <span className={styles.errorText}>{errors.background}</span>
            )}
          </div>
          <div
            className={`${styles.inputGroup} ${
              errors.password ? styles.error : ""
            }`}
          >
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? styles.error : ""}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>
          <div
            className={`${styles.inputGroup} ${
              errors.confirmPassword ? styles.error : ""
            }`}
          >
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? styles.error : ""}
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>
          <div className={styles.submitButtonWrapper}>
            <button type="submit">만들기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyRegistration;
