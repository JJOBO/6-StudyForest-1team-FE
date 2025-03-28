import React, { useState, useEffect } from "react";
import "./Modal.scss";
import trash from "../../assets/icons/ic_trash.svg";
import modification from "../../assets/buttons/btn_modification/btn_modification_pc.svg";
import cancel from "../../assets/buttons/btn_cancel/btn_cancel_pc.svg";

const Modal = ({ isOpen, onClose, habits, onSave, onDelete }) => {
  const [editedHabits, setEditedHabits] = useState(habits);

  // 습관 수정 함수
  const handleEditHabit = (index, newName) => {
    const updatedHabits = [...editedHabits];
    updatedHabits[index].name = newName;
    setEditedHabits(updatedHabits);
  };

  // 습관 삭제 함수
  const handleDeleteHabit = (index) => {
    const updatedHabits = editedHabits.filter((_, i) => i !== index);
    setEditedHabits(updatedHabits);
    onDelete(index);
  };

  // 습관 생성 함수
  const handleAddHabit = () => {
    setEditedHabits([
      ...editedHabits,
      { id: Date.now(), name: "", isActive: true },
    ]);
  };

  // 수정 완료
  const handleSave = () => {
    onSave(editedHabits);
    onClose();
  };

  // 취소
  const handleCancel = () => {
    setEditedHabits(habits);
    onClose();
  };

  // 모달이 열릴 때마다 습관 데이터를 초기화
  useEffect(() => {
    setEditedHabits(habits);
  }, [habits, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>습관 목록</h2>

        <div className="habit-list">
          {editedHabits.map((habit, index) => (
            <div key={habit.id} className="habit-item">
              <input
                type="text"
                value={habit.name}
                onChange={(e) => handleEditHabit(index, e.target.value)}
                className="habit-input"
              />
              <button
                onClick={() => handleDeleteHabit(index)}
                className="delete-btn"
              >
                <img className="habit-trash" src={trash} />
              </button>
            </div>
          ))}
        </div>

        <button className="add-btn" onClick={handleAddHabit}>+</button>

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

export default Modal;
