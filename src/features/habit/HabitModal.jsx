import React, { useState, useEffect } from "react";
import "./HabitModal.scss";
import trash from "../../assets/icons/ic_trash.svg";
import modification from "../../assets/buttons/btn_modification/btn_modification_pc.svg";
import cancel from "../../assets/buttons/btn_cancel/btn_cancel_pc.svg";

const HabitModal = ({ isOpen, onClose, habits, onSave, onDelete }) => {
  const [editedHabits, setEditedHabits] = useState(habits);
  const [pendingDeletions, setPendingDeletions] = useState([]);

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

  // 습관 삭제
  const handleDeleteHabit = (index) => {
    const habitToDelete = editedHabits[index];
    const updatedHabits = editedHabits.filter((_, i) => i !== index);
    setEditedHabits(updatedHabits);

    if (habitToDelete.id) {
      setPendingDeletions([...pendingDeletions, habitToDelete.id]);
    }
  };

  const handleSave = async () => {
    for (const habitId of pendingDeletions) {
      await onDelete(habitId);
    }

    onSave(editedHabits);
    onClose();
  };

  // 취소
  const handleCancel = () => {
    setEditedHabits(habits);
    setPendingDeletions([]);
    onClose();
  };

  useEffect(() => {
    setEditedHabits(habits);
    setPendingDeletions([]);
  }, [habits, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="habit-list-title">습관 목록</p>
        </div>

        <div className="habit-list">
          {editedHabits.map((habit, index) => (
            <div key={habit.id || index} className="habit-item">
              <input
                type="text"
                value={habit.name}
                onChange={(e) => handleEditHabit(index, e.target.value)}
                className="habit-input"
              />
              <button
                className="delete-btn"
                onClick={() => handleDeleteHabit(index)}
              >
                <img className="habit-trash" src={trash} alt="삭제" />
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