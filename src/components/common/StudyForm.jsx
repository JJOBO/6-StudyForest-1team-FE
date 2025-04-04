import React, { useEffect, useState } from "react";
import styles from "./StudyForm.module.scss";
import selectedIcon from "../../assets/icons/ic_bg_selected.svg";
import visibilityOnIcon from "../../assets/buttons/btn_visibility/btn_visibility_on_24px.svg";
import visibilityOffIcon from "../../assets/buttons/btn_visibility/btn_visibility_off_24px.svg";

function StudyForm({
  mode = "register",
  initialValues,
  onSubmit,
  backgrounds,
}) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // 유효성 검사
    if (!form.studyName)
      validationErrors.studyName = "*스터디 이름을 입력해주세요";
    if (!form.nickname) validationErrors.nickname = "*닉네임을 입력해주세요";
    if (!form.description)
      validationErrors.description = "*소개 멘트를 작성해주세요.";
    if (!form.password) validationErrors.password = "*비밀번호를 입력해주세요.";
    if (form.password !== form.confirmPassword)
      validationErrors.confirmPassword = "*비밀번호가 일치하지 않습니다";
    if (!form.background) validationErrors.background = "*배경을 선택해주세요.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const selectedBackground = backgrounds.find(
      (bg) => bg.color === form.background
    );
    const backgroundName = selectedBackground
      ? selectedBackground.name
      : form.background;
    await onSubmit({
      name: form.studyName,
      creatorNick: form.nickname,
      description: form.description,
      password: form.password,
      passwordConfirm: form.confirmPassword,
      background: backgroundName,
      backgroundColor: form.background,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formTitle}>
        {mode === "edit" ? "스터디 수정하기" : "스터디 만들기"}
      </div>

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
          value={form.nickname}
          onChange={(e) => setField("nickname", e.target.value)}
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
          value={form.studyName}
          onChange={(e) => setField("studyName", e.target.value)}
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
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
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
                form.background === bg.color ? styles.selected : ""
              }`}
              onClick={() => setField("background", bg.color)}
            >
              {typeof bg.color === "string" && bg.color.startsWith("#") ? (
                <div
                  className={styles.colorBg}
                  style={{ backgroundColor: bg.color }}
                ></div>
              ) : (
                <img src={bg.color} alt={bg.name} />
              )}

              {form.background === bg.color && (
                <img
                  src={selectedIcon}
                  alt="선택 아이콘"
                  className={styles.selectedIcon}
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
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해 주세요"
          value={form.password}
          onChange={(e) => setField("password", e.target.value)}
          className={errors.password ? styles.error : ""}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={styles.toggleButton}
        >
          <img
            src={showPassword ? visibilityOnIcon : visibilityOffIcon}
            alt={showPassword ? "숨기기" : "보기"}
          />
        </button>
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
          type={showConfirmPassword ? "text" : "password"}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          value={form.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          className={errors.confirmPassword ? styles.error : ""}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className={styles.toggleButton}
        >
          <img
            src={showConfirmPassword ? visibilityOnIcon : visibilityOffIcon}
            alt={showConfirmPassword ? "숨기기" : "보기"}
          />
        </button>
        {errors.confirmPassword && (
          <span className={styles.errorText}>{errors.confirmPassword}</span>
        )}
      </div>

      <button className={styles.submitButtonWrapper}>
        {mode === "edit" ? "수정하기" : "만들기"}
      </button>
    </form>
  );
}

export default StudyForm;
