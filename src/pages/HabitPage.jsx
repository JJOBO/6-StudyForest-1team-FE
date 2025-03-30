import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitAPI from "../features/habit/habitAPI";
import arrow from "../assets/icons/ic_arrow_right.svg";
import "./HabitPage.scss";
import { Link } from "react-router-dom";
import HabitModal from "../features/habit/HabitModal.jsx";
import FormattedDate from "../features/habit/FormattedDate";

const HabitPage = () => {
  const { studyId } = useParams();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (studyId) {
      habitAPI
        .getHabits(studyId)
        .then((data) => {
          setHabits(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("습관 데이터를 가져오는 데 실패했습니다.");
          setLoading(false);
        });
    }
  }, [studyId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 습관 수정
  const saveHabits = (updatedHabits) => {
    updatedHabits.forEach((habit) => {
      if (habit.isUpdated) {
        habitAPI
          .updateHabit(habit.id, { name: habit.name })
          .then((updatedHabit) => {
            console.log("습관 수정 완료:", updatedHabit);
          })
          .catch((err) => {
            console.error("습관 수정 실패:", err);
          });
      }
    });

    setHabits(updatedHabits);
  };

  const deleteHabit = (habitId) => {
    habitAPI
      .deleteHabit(habitId)
      .then((result) => {
        if (result && result.success) {
          console.log("삭제 성공");
          const updatedHabits = habits.filter((habit) => habit.id !== habitId);
          setHabits(updatedHabits);
        } else {
          console.error("삭제 실패:", result?.message || "알 수 없는 오류");
        }
      })
      .catch((err) => {
        console.error("습관 삭제 실패:", err);
      });
  };
  return (
    <div className="habit-container">
      <nav className="habit-nav">
        <div className="habit-top-nav">
          <div className="habit-study-title">연우의 개발공장</div>
          <div className="habit-btns">
            <button className="habit-btn">
              오늘의 집중
              <img src={arrow} alt="arrow" />
            </button>
            <Link to="/study">
              <button className="habit-btn">
                홈
                <img src={arrow} alt="arrow" />
              </button>
            </Link>
          </div>
        </div>
        <div className="habit-time">
          <span className="current-text">현재 시간</span>
          <FormattedDate />
        </div>
      </nav>

      <section className="habit-section">
        <div className="habit-content">
          <div className="habit-bar">
            <div className="habit-title">오늘의 습관</div>
            <button onClick={openModal} className="edit-btn">
              목록수정
            </button>
            <HabitModal
              isOpen={isModalOpen}
              onClose={closeModal}
              habits={habits}
              onSave={saveHabits}
              onDelete={deleteHabit}
            />
          </div>
          <div className="habit-list">
            {habits.length > 0 ? (
              habits.map((habit) => (
                <button
                  key={habit.id}
                  className={habit.isActive ? "active" : "inactive"}
                >
                  {habit.name}
                </button>
              ))
            ) : (
              <p>습관이 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HabitPage;
