import React, { useEffect, useState } from "react";
import styles from "./StudyModification.module.scss";
import studyAPI from "../components/features/study/studyAPI";
import { useNavigate, useParams } from "react-router-dom";
import { backgrounds } from "../constants/backgrounds";
import StudyForm from "../components/common/StudyForm";

function StudyModification() {
  const [initialValues, setInitialValues] = useState(null);
  const { studyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const studyDetail = await studyAPI.getStudyDetail(studyId);
        const foundBackground = backgrounds.find(
          (bg) => bg.name === studyDetail.background
        );

        setInitialValues({
          studyName: studyDetail.name,
          nickname: studyDetail.creatorNick,
          description: studyDetail.description,
          password: "",
          confirmPassword: "",
          background: foundBackground
            ? foundBackground.color
            : studyDetail.background,
        });
      } catch (error) {
        window.alert("스터디 정보를 가져오는데 실패했습니다.");
        navigate("/");
      }
    };

    if (studyId) fetchStudyDetail();
  }, [studyId, navigate]);

  const handleSubmit = async (data) => {
    try {
      const response = await studyAPI.updateStudy(studyId, data);
      console.log("Study updated:", response);
      navigate(`/${studyId}`);
    } catch (error) {
      console.error("Failed to modify study:", error);
      alert("스터디 수정에 실패했습니다.");
    }
  };

  return (
    <div className={styles.studyModificationPageLayout}>
      <div className={styles.studyModification}>
        {initialValues && (
          <StudyForm
            mode="edit"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            backgrounds={backgrounds}
          />
        )}
      </div>
    </div>
  );
}

export default StudyModification;
