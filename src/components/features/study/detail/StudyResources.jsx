import React, { useEffect, useState } from "react";
import studyAPI from "../studyAPI";
import { Link } from "react-router-dom";
import Point from "../../../common/Point";
import Emoji from "../../../common/Emoji";
import styles from "./StudyResources.module.scss"; // Import SCSS module
import LinkButton from "../../../common/LinkButton";
import PasswordPrompt from "../../../common/PasswordPrompt"; // PasswordPrompt 컴포넌트 추가

function StudyResources({ studyId }) {
  const [studyDetail, setStudyDetail] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

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
              <p onClick={() => setShowPasswordPrompt(true)}>스터디 삭제하기</p>
            </div>
          </div>
          <div className={styles.studyContainer}>
            <div className={styles.studyTitle}>
              <h1>
                {studyDetail.creatorNick}의 {studyDetail.name}
              </h1>
              <div className={styles.linkButtons}>
                <LinkButton type={"habit"} studyId={studyId} />
                <LinkButton type={"focus"} studyId={studyId} />
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
      {showPasswordPrompt && (
        <PasswordPrompt
          // 비밀번호 프롬프트 컴포넌트
          // 스터디 삭제 시 사용자에게 비밀번호를 입력받기 위해 사용
          studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`} // 프롬프트에 표시할 스터디 제목 전달
          onSubmit={handleDelete} // 비밀번호 입력 후 삭제 처리 함수
          onCancel={() => setShowPasswordPrompt(false)} // 취소 시 프롬프트 닫기
        />
      )}
    </div>
  );
}

export default StudyResources;
