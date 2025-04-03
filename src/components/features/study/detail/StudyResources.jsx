import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import studyAPI from "../studyAPI";
import Point from "../../../common/Point";
import Emoji from "../../../common/Emoji";
import LinkButton from "../../../common/LinkButton";
import styles from "./StudyResources.module.scss"; // SCSS 모듈
import PasswordPrompt from "../../../common/PasswordPrompt"; // 비밀번호 프롬프트
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast } from "./PasswordToast";

function StudyResources({ studyId }) {
  const [studyDetail, setStudyDetail] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(null); // "delete" | "habit" | "focus" | "modification"
  const navigate = useNavigate();

  // 스터디 상세 정보 불러오기
  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const data = await studyAPI.getStudyDetail(studyId);
        setStudyDetail(data);
      } catch (error) {
        console.error("Failed to fetch study detail:", error);
      }
    };

    if (studyId) {
      fetchStudyDetail();
    }
  }, [studyId]);

  // 공유하기 링크 복사
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/${studyId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(`링크가 복사되었습니다: ${shareUrl}`);
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("링크 복사에 실패했습니다.");
    }
  };

  // 스터디 삭제
  const handleDelete = async (password) => {
    if (!password) return;
    try {
      await studyAPI.deleteStudy(studyId, password);
      const recentStudyIds = JSON.parse(
        localStorage.getItem("recentStudyIds") || "[]"
      );
      const updatedIds = recentStudyIds.filter((id) => id !== studyId);
      localStorage.setItem("recentStudyIds", JSON.stringify(updatedIds));
      alert("스터디가 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete study:", error);
      showErrorToast();
      return; // 실패 시 모달 유지
    }
    setShowPasswordPrompt(null);
  };

  // 스터디 수정 페이지로 이동
  const handleEdit = async (password) => {
    try {
      const result = await studyAPI.authenticateStudy(studyId, password);
      if (result.success) {
        navigate(`/${studyId}/modification`);
        setShowPasswordPrompt(null);
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Failed to authenticate for modification:", error);
      showErrorToast();
    }
  };

  // 습관 페이지 인증 후 이동
  const handleHabitAccess = async (password) => {
    try {
      await habitAPI.authenticateHabit(studyId, password);
      navigate(`/${studyId}/habits`);
      setShowPasswordPrompt(null);
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  // 집중 페이지 인증 후 이동
  const handleFocusAccess = async (password) => {
    try {
      await focusAPI.authenticateFocus(studyId, password);
      navigate(`/${studyId}/focus`);
      setShowPasswordPrompt(null);
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  return (
    <div>
      {studyDetail ? (
        <div>
          <div className={styles.studyHeader}>
            <div className={styles.studyEmojis}>
              {studyDetail.emojis.map((emoji, index) => (
                <Emoji
                  key={index}
                  type="general"
                  emoji={emoji.emoji}
                  count={emoji.count}
                />
              ))}
            </div>
            <div className={styles.studyOptions}>
              <p onClick={handleShare}>공유하기</p>
              <p>|</p>
              <p onClick={() => setShowPasswordPrompt("modification")}>
                수정하기
              </p>
              <p>|</p>
              <p onClick={() => setShowPasswordPrompt("delete")}>
                스터디 삭제하기
              </p>
            </div>
          </div>
          <div className={styles.studyContainer}>
            <div className={styles.studyTitle}>
              <h1>
                {studyDetail.creatorNick}의 {studyDetail.name}
              </h1>
              <div className={styles.linkButtons}>
                <LinkButton
                  type="habit"
                  onClick={() => setShowPasswordPrompt("habit")}
                />
                <LinkButton
                  type="focus"
                  onClick={() => setShowPasswordPrompt("focus")}
                />
              </div>
            </div>
            <div className={styles.studyDescription}>
              <p>소개</p>
              <p>{studyDetail.description}</p>
            </div>
            <div className={styles.studyPoints}>
              <p>현재까지 획득한 포인트</p>
              <Point
                type="general"
                points={studyDetail.totalPoints}
                className={styles.point}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>스터디 디테일 로딩중...</p>
      )}

      {/* 비밀번호 입력 모달 - 삭제 */}
      {studyDetail && showPasswordPrompt === "delete" && (
        <PasswordPrompt
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
          actionType="삭제"
          onSubmit={handleDelete}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}

      {/* 비밀번호 입력 모달 - 습관 */}
      {studyDetail && showPasswordPrompt === "habit" && (
        <PasswordPrompt
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
          actionType="습관"
          onSubmit={handleHabitAccess}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}

      {/* 비밀번호 입력 모달 - 집중 */}
      {studyDetail && showPasswordPrompt === "focus" && (
        <PasswordPrompt
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
          actionType="집중"
          onSubmit={handleFocusAccess}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}

      {/* 비밀번호 입력 모달 - 수정 */}
      {studyDetail && showPasswordPrompt === "modification" && (
        <PasswordPrompt
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
          actionType="수정"
          onSubmit={handleEdit}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default StudyResources;
