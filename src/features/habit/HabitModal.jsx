// import HabitList from "./HabitList";
import "./HabitModal.scss";
import HabitList from "./HabitList";
import deletBtn from "../../assets/buttons/btn_determinate.svg";
import plusIcon from "../../assets/icons/ic_plus.svg";
import cancelBtn from "../../assets/buttons/btn_cancel/btn_cancel_pc.svg";
import modifyBtn from "../../assets/buttons/btn_modification/btn_modification_pc.svg";

function HabitModal({ habits }) {
  return (
    <div className="modal">
      <div className="container">
        <div className="title">습관 목록</div>
        <div className="habit-list">
          {habits.map((habit) => (
            <div>
              <div className="habit">
                <HabitList
                  key={habit.id}
                  habit={habit}
                  overrideClassName="inactive"
                />
                <img src={deletBtn} alt="습관 삭제 버튼" />
              </div>
            </div>
          ))}
          <button className="plus-btn">
            <img src={plusIcon} alt="습관 추가 버튼" />
          </button>
        </div>
        <div className="modal-btns">
          <button>
            <img src={cancelBtn} />
          </button>
          <button>
            <img src={modifyBtn} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitModal;
