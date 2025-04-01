import React, { useState } from "react";
import "./StudyRegistration.scss";
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
    <div className="study-registration-page-layout">
      <div className="study-registration">
        <form onSubmit={handleSubmit} className="form-container">
          <h2>스터디 만들기</h2>
          {errors.api && <span className="error-text">{errors.api}</span>}
          <div className="input-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={errors.nickname ? "error" : ""}
            />
            {errors.nickname && (
              <span className="error-text">{errors.nickname}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="studyName">스터디 이름</label>
            <input
              id="studyName"
              type="text"
              placeholder="스터디 이름을 입력해주세요"
              value={studyName}
              onChange={(e) => setStudyName(e.target.value)}
              className={errors.studyName ? "error" : ""}
            />
            {errors.studyName && (
              <span className="error-text">{errors.studyName}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="description">소개</label>
            <textarea
              id="description"
              placeholder="소개 멘트를 작성해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "error" : ""}
            ></textarea>
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>
          <div className="input-group">
            <label>배경을 선택해주세요</label>
            <div className="background-selection">
              {backgrounds.map((bg, index) => (
                <div
                  key={index}
                  className={`bg-option ${
                    background === bg.color ? "selected" : ""
                  }`}
                  onClick={() => setBackground(bg.color)}
                >
                  {typeof bg.color === "string" && bg.color.startsWith("#") ? (
                    <div
                      className="color-bg"
                      style={{ backgroundColor: bg.color }}
                    ></div>
                  ) : (
                    <img
                      src={`/src/assets/background/${bg.color}.jpg`}
                      alt="background"
                    />
                  )}
                </div>
              ))}
            </div>
            {errors.background && (
              <span className="error-text">{errors.background}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="submit-button-wrapper">
            <button type="submit">만들기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyRegistration;
