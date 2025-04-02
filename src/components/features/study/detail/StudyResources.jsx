import React, { useEffect, useState } from "react";
import studyAPI from "../studyAPI";
import focusAPI from "../../focus/focusAPI";
import habitAPI from "../../habit/habitAPI";
import Point from "../../../common/Point";
import Emoji from "../../../common/Emoji";
import styles from "./StudyResources.module.scss"; // Import SCSS module
import PasswordPrompt from "../../../common/PasswordPrompt"; // PasswordPrompt 컴포넌트 추가

function StudyResources({ studyId }) {
  const [studyDetail, setStudyDetail] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(null);

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

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/study/${studyId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(`링크가 복사되었습니다: ${shareUrl}`);
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("링크 복사에 실패했습니다.");
    }
  };

  const handleEdit = async () => {
    const newName = prompt(
      "새로운 스터디 이름을 입력하세요:",
      studyDetail.name
    );
    if (newName && newName !== studyDetail.name) {
      try {
        const updatedStudy = await studyAPI.updateStudy(studyId, {
          name: newName,
        });
        setStudyDetail({ ...studyDetail, name: updatedStudy.name });
        alert("스터디 이름이 수정되었습니다.");
      } catch (error) {
        console.error("Failed to update study:", error);
        alert("스터디 수정에 실패했습니다.");
      }
    }
  };

  const handleDelete = async (password) => {
    if (password) {
      try {
        await studyAPI.deleteStudy(studyId, password);

        // localStorage에서 스터디 ID 제거
        const recentStudyIds = JSON.parse(
          localStorage.getItem("recentStudyIds") || "[]"
        );
        const updatedStudyIds = recentStudyIds.filter((id) => id !== studyId);
        localStorage.setItem("recentStudyIds", JSON.stringify(updatedStudyIds));

        alert("스터디가 삭제되었습니다.");
        window.location.href = "/"; // 홈 또는 다른 페이지로 리다이렉트
      } catch (error) {
        console.error("Failed to delete study:", error);
        alert("스터디 삭제에 실패했습니다.");
      }
    }
    setShowPasswordPrompt(false); // 비밀번호 프롬프트 닫기
  };

  const handleHabitAccess = async (password) => {
    try {
      await habitAPI.authenticateHabit(studyId, password);
      window.location.href = `/${studyId}/habits`;
    } catch (error) {
      console.error(error);
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleFocusAccess = async (password) => {
    try {
      await focusAPI.authenticateFocus(studyId, password);
      window.location.href = `/${studyId}/focus`;
    } catch (error) {
      console.error(error);
      alert("비밀번호가 틀렸습니다.");
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
                  type="general"
                  key={index}
                  emoji={emoji.emoji}
                  count={emoji.count}
                />
              ))}
            </div>
            <div className={styles.studyOptions}>
              <p onClick={handleShare}>공유하기</p>
              <p>|</p>
              <p onClick={handleEdit}>수정하기</p>
              <p>|</p>
              {/* 비밀번호 프롬프트를 열기 위한 버튼 */}
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
                <button onClick={() => setShowPasswordPrompt("habit")}>
                  오늘의 습관
                </button>
                <button onClick={() => setShowPasswordPrompt("focus")}>
                  오늘의 집중
                </button>
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
      {studyDetail && showPasswordPrompt === "delete" && (
        <PasswordPrompt
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
          actionType="삭제"
          onSubmit={handleDelete}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}
      {studyDetail && showPasswordPrompt === "habit" && (
        <PasswordPrompt
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
          actionType="습관"
          onSubmit={handleHabitAccess}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}
      {studyDetail && showPasswordPrompt === "focus" && (
        <PasswordPrompt
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
          actionType="집중"
          onSubmit={handleFocusAccess}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}
    </div>
  );
}

export default StudyResources;
