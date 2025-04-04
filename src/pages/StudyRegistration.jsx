import React from "react";
import styles from "./StudyRegistration.module.scss";
import studyAPI from "../components/features/study/studyAPI";
import { useNavigate } from "react-router-dom";
import { backgrounds } from "../constants/backgrounds";
import StudyForm from "../components/common/StudyForm";

function StudyRegistration() {
  const navigate = useNavigate();

  const initialValues = {
    studyName: "",
    nickname: "",
    description: "",
    password: "",
    confirmPassword: "",
    background: backgrounds[0].color,
  };

  // 폼 제출 핸들러
  const handleSubmit = async (formData) => {
    try {
      const response = await studyAPI.createStudy(formData);
      console.log("Study created:", response);
      localStorage.setItem(
        `studyBackground-${response.id}`,
        formData.backgroundColor
      );
      navigate(`/${response.id}`);
    } catch (error) {
      console.error("Failed to create study:", error);
      alert("스터디 생성에 실패했습니다.");
    }
  };

  return (
    <div className={styles.studyRegistrationPageLayout}>
      <div className={styles.studyRegistration}>
        <StudyForm
          mode="register"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          backgrounds={backgrounds}
        />
      </div>
    </div>
  );
}

export default StudyRegistration;
