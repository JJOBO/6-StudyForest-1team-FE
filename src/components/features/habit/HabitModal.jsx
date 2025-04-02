import React, { useState, useEffect } from "react";
import styles from "./HabitModal.module.scss";
import deleteBtn from "../../../assets/buttons/btn_determinate.svg";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import cancelBtnPC from "../../../assets/buttons/btn_cancel/btn_cancel_pc.svg";
import cancelBtnMobile from "../../../assets/buttons/btn_cancel/btn_cancel_mobile.svg";
import modifyBtnPC from "../../../assets/buttons/btn_modification/btn_modification_pc.svg";
import modifyBtnMobile from "../../../assets/buttons/btn_modification/btn_modification_mobile.svg";
import { useHabit } from "../study/habit/HabitContext";

const HabitModal = ({ isOpen, onClose, habits, onSave, onDelete }) => {
  const [editedHabits, setEditedHabits] = useState(habits);
  const [pendingDeletions, setPendingDeletions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767); // 모바일 여부 체크
  const { triggerRefresh } = useHabit();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 습관 수정 함수
  const handleEditHabit = (index, newName) => {
    const updatedHabits = [...editedHabits];
    updatedHabits[index] = {
      ...updatedHabits[index],
      name: newName,
      isUpdated: true,
    };
    setEditedHabits(updatedHabits);
  };

  // 습관 삭제 함수
  const handleDeleteHabit = (index) => {
    const habitToDelete = editedHabits[index];
    const updatedHabits = editedHabits.filter((_, i) => i !== index);
    setEditedHabits(updatedHabits);

    if (habitToDelete.id) {
      setPendingDeletions([...pendingDeletions, habitToDelete.id]);
    }
  };

  // 습관 생성 함수
  const handleAddHabit = () => {
    setEditedHabits([...editedHabits, { id: null, name: "", isActive: true }]);
  };

  // 수정 완료
  const handleSave = async () => {
    const isHabitNameEmpty = editedHabits.some(
      (habit) => habit.name.trim() === ""
    );
    const habitName = editedHabits.map((habit) => habit.name.trim());
    const isHabitNameExist = new Set(habitName).size !== habitName.length;

    if (isHabitNameEmpty) {
      alert("습관 이름을 입력해 주세요.");
      return;
    } else if (isHabitNameExist) {
      alert("이미 존재하는 습관입니다.");
      return;
    }

    for (const habitId of pendingDeletions) {
      await onDelete(habitId);
    }

    onSave(editedHabits);
    onClose();
    triggerRefresh();
  };

  // 취소
  const handleCancel = () => {
    setEditedHabits(habits);
    setPendingDeletions([]);
    onClose();
  };

  // 모달이 열릴 때마다 습관 데이터를 초기화
  useEffect(() => {
    setEditedHabits(habits);
    setPendingDeletions([]);
  }, [habits, isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>습관 목록</div>
        <div className={styles.habitList}>
          {editedHabits.map((habit, index) => (
            <div
              key={habit.id != null ? habit.id : `new-${index}`}
              className={styles.habitItem}
            >
              <input
                type="text"
                value={habit.name}
                onChange={(e) => handleEditHabit(index, e.target.value)}
                className={styles.input}
              />
              <img
                src={deleteBtn}
                onClick={() => handleDeleteHabit(index)}
                alt="습관 삭제 버튼"
              />
            </div>
          ))}
          <button className={styles.addBtn} onClick={handleAddHabit}>
            <img src={plusIcon} alt="습관 추가 버튼" />
          </button>
        </div>

        <div className={styles.modalActions}>
          <button onClick={handleCancel}>
            <img
              src={isMobile ? cancelBtnMobile : cancelBtnPC}
              alt="취소 버튼"
            />
          </button>
          <button onClick={handleSave}>
            <img
              src={isMobile ? modifyBtnMobile : modifyBtnPC}
              alt="수정 완료 버튼"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitModal;
