import React, { useEffect, useState } from "react";
import studyAPI from "../studyAPI";
import { Link } from "react-router-dom";
import Point from "../../../common/Point";
import Emoji from "../../../common/Emoji";
import styles from "./StudyResources.module.scss"; // Import SCSS module
import LinkButton from "../../../common/LinkButton";

function StudyResources({ studyId }) {
  const [studyDetail, setStudyDetail] = useState(null);

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

  const handleDelete = async () => {
    const password = prompt("스터디 삭제를 위해 비밀번호를 입력하세요:");
    if (password) {
      try {
        await studyAPI.deleteStudy(studyId, password);
        alert("스터디가 삭제되었습니다.");
        window.location.href = "/"; // Redirect to home or another page
      } catch (error) {
        console.error("Failed to delete study:", error);
        alert("스터디 삭제에 실패했습니다.");
      }
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
              <p onClick={handleDelete}>스터디 삭제하기</p>
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
    </div>
  );
}

export default StudyResources;
