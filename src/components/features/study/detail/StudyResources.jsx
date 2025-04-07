import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import studyAPI from "../studyAPI";
import focusAPI from "../../focus/focusAPI";
import habitAPI from "../../habit/habitAPI";
import Emoji from "../../../common/Emoji";
import LinkButton from "../../../common/LinkButton";
import styles from "./StudyResources.module.scss";
import PasswordPrompt from "../../../common/PasswordPrompt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast } from "./PasswordToast";
import Picker from "emoji-picker-react";
import AddButtonIcon from "/src/assets/buttons/btn_add.svg";
import PointDisplay from "../../../common/PointDisplay";

function StudyResources({ studyId }) {
  const [studyDetail, setStudyDetail] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
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

  // 이모지 피커에서 이모지 선택 시 호출되는 함수
  const onEmojiClick = async (emojiData) => {
    setShowPicker(false);
    try {
      await studyAPI.addEmojiToStudy(studyId, emojiData.emoji);
      // 이모지 추가 후 스터디 상세 정보를 다시 불러와서 이모지 목록을 업데이트
      const data = await studyAPI.getStudyDetail(studyId);
      setStudyDetail(data);
    } catch (error) {
      console.error("Failed to add emoji:", error);
    }
  };

  // 이모지 추가 버튼 클릭 시 호출되는 함수
  const handleAddEmojiClick = () => {
    setShowPicker(!showPicker);
  };

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
      return;
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
      console.error(error);
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

  const [showAllEmojis, setShowAllEmojis] = useState(false);

  return (
    <>
      <section>
        {studyDetail ? (
          <article>
            <div className={styles.studyHeader}>
              <div className={styles.studyEmojis}>
                {studyDetail.emojis.slice(0, 3).map((emoji, index) => (
                  <Emoji
                    key={index}
                    type="general"
                    emoji={emoji.emoji}
                    count={emoji.count}
                  />
                ))}

                {/* +n 버튼: 4개 이상일 때만 보임 */}
                {studyDetail.emojis.length > 3 && (
                  <button
                    className={styles.emojiMoreButton}
                    onClick={() => setShowAllEmojis((prev) => !prev)} // ❗누르면 토글
                  >
                    +{studyDetail.emojis.length - 3}
                  </button>
                )}

                {/* 이모지 추가 버튼 */}
                <div className={styles.emojiPickerWrapper}>
                  <button
                    className={styles.emojiAddButton}
                    onClick={handleAddEmojiClick}
                  >
                    <img src={AddButtonIcon} alt="이모지 추가" />
                  </button>

                  {/* 이모지 피커 */}
                  {showPicker && (
                    <div className={styles.pickerOverlay}>
                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </div>
                {showAllEmojis && (
                  <div className={styles.emojiPopover}>
                    {studyDetail.emojis.slice(3).map((emoji, index) => (
                      <Emoji
                        key={index}
                        type="general"
                        emoji={emoji.emoji}
                        count={emoji.count}
                      />
                    ))}
                  </div>
                )}
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
                <PointDisplay totalPoints={studyDetail.totalPoints} />
              </div>
            </div>
          </article>
        ) : (
          <p></p>
        )}

        {/* 비밀번호 입력 모달 - 삭제 */}
        {studyDetail && showPasswordPrompt === "delete" && (
          <PasswordPrompt
            studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
            buttonLabel="삭제"
            onSubmit={handleDelete}
            onCancel={() => setShowPasswordPrompt(null)}
          />
        )}

        {/* 비밀번호 입력 모달 - 습관 */}
        {studyDetail && showPasswordPrompt === "habit" && (
          <PasswordPrompt
            studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
            buttonLabel="오늘의 습관으로 가기"
            onSubmit={handleHabitAccess}
            onCancel={() => setShowPasswordPrompt(null)}
          />
        )}

        {/* 비밀번호 입력 모달 - 집중 */}
        {studyDetail && showPasswordPrompt === "focus" && (
          <PasswordPrompt
            studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
            buttonLabel="오늘의 집중으로 가기"
            onSubmit={handleFocusAccess}
            onCancel={() => setShowPasswordPrompt(null)}
          />
        )}

        {/* 비밀번호 입력 모달 - 수정 */}
        {studyDetail && showPasswordPrompt === "modification" && (
          <PasswordPrompt
            studyTitle={`${studyDetail.creatorNick}의 ${studyDetail.name}`}
            buttonLabel="수정하러 가기"
            onSubmit={handleEdit}
            onCancel={() => setShowPasswordPrompt(null)}
          />
        )}
      </section>
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default StudyResources;
