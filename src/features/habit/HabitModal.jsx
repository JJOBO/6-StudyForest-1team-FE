import React, { useState, useEffect } from "react";
import "./HabitModal.scss";
import trash from "../../assets/icons/ic_trash.svg";
import modification from "../../assets/buttons/btn_modification/btn_modification_pc.svg";
import cancel from "../../assets/buttons/btn_cancel/btn_cancel_pc.svg";

const HabitModal = ({ isOpen, onClose, habits, onSave }) => {
  const [editedHabits, setEditedHabits] = useState(habits);

  // 습관 수정
  const handleEditHabit = (index, newName) => {
    const updatedHabits = [...editedHabits];
    updatedHabits[index] = {
      ...updatedHabits[index],
      name: newName,
      isUpdated: true,
    };
    setEditedHabits(updatedHabits);
  };

  // 수정 완료
  const handleSave = async () => {
    onSave(editedHabits);
    onClose();
  };

  // 취소
  const handleCancel = () => {
    setEditedHabits(habits);
    onClose();
  };

  useEffect(() => {
    setEditedHabits(habits);
  }, [habits, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="habit-list-title">습관 목록</p>
        </div>

        <div className="habit-list">
          {editedHabits.map((habit, studyId) => (
            <div key={habit.id} className="habit-item">
              <input
                type="text"
                value={habit.name}
                onChange={(e) => handleEditHabit(studyId, e.target.value)}
                className="habit-input"
              />
              <button className="delete-btn">
                <img className="habit-trash" src={trash} />
              </button>
            </div>
          ))}
          <button className="add-btn">+</button>
        </div>

        <div className="modal-actions">
          <div className="cancel-btn" onClick={handleCancel}>
            <img src={cancel} alt="취소" />
          </div>
          <div className="save-btn" onClick={handleSave}>
            <img src={modification} alt="수정 완료" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitModal;
