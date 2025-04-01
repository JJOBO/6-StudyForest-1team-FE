import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitAPI from "../components/features/habit/habitAPI";
import "./HabitPage.scss";
import { Link } from "react-router-dom";
import HabitModal from "../components/features/habit/HabitModal";
import FormatDate from "../components/features/habit/FormatDate";
import HabitList from "../components/features/habit/HabitList";
import Header from "../components/layout/Header";

export default function HabitPage() {
  const { studyId } = useParams();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedHabits, setCheckedHabits] = useState([]);

  useEffect(() => {
    if (studyId) {
      Promise.all([
        habitAPI.getHabits(studyId),
        habitAPI.getCheckedHabits(studyId),
      ])
        .then(([data, records]) => {
          const sortedHabits = data.sort((a, b) => a.id - b.id);
          setHabits(sortedHabits);

          const checked = records.map((record) => record.habitId);
          setCheckedHabits(checked);

          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("습관 데이터를 가져오는 데 실패했습니다.");
          setLoading(false);
        });
    }
  }, [studyId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const saveHabits = async (updatedHabits) => {
    const newHabits = [];
    const existingHabits = [];

    for (const habit of updatedHabits) {
      if (habit.id === null) {
        // 신규 습관인 경우 create
        try {
          const created = await habitAPI.createHabit(studyId, {
            name: habit.name,
          });
          newHabits.push(created);
          console.log("습관 생성 완료:", created);
        } catch (err) {
          console.error("습관 생성 실패:", err);
        }
      } else if (habit.isUpdated) {
        try {
          const updated = await habitAPI.updateHabit(habit.id, {
            name: habit.name,
          });
          existingHabits.push(updated);
          console.log("습관 수정 완료:", updated);
        } catch (err) {
          console.error("습관 수정 실패:", err);
        }
      } else {
        existingHabits.push(habit);
      }
    }

    setHabits([...existingHabits, ...newHabits]);
  };

  const deleteHabit = (habitId) => {
    habitAPI
      .deleteHabit(habitId)
      .then(() => {
        const updatedHabits = habits.filter((habit) => habit.id !== habitId);
        setHabits(updatedHabits);
      })
      .catch((err) => {
        console.error("습관 삭제 실패:", err);
      });
  };

  const toggleCheckHabit = async (habit) => {
    const isChecked = checkedHabits.includes(habit.id);

    // Optimistic UI 적용(UI 먼저 업데이트 -> 서버 요청 이후에 처리)
    const updatedHabits = isChecked
      ? checkedHabits.filter((id) => id !== habit.id) // 이미 체크되어 있으면 현재 목록에서 해당 습관 ID 제거
      : [...checkedHabits, habit.id]; // 체크 안되어 있으면 기존 목록에 해당 습관 ID 추가

    setCheckedHabits(updatedHabits);

    try {
      if (isChecked) {
        await habitAPI.uncheckHabit(habit.id);
      } else {
        await habitAPI.checkHabit(habit.id);
      }
    } catch (err) {
      if (isChecked) {
        console.error("습관 체크 실패", err);
      } else {
        console.error("습관 체크 해제 실패", err);
      }
      setCheckedHabits(checkedHabits);
    }
  };

  return (
    <>
      <header>
        <Header isButtonDisabled={true} />
      </header>
      <main className="container">
        <nav className="nav">
          <div className="study-title">연우의 개발공장</div>
          <div className="links">
            <Link to={`/${studyId}/focus`}>
              <button>오늘의 집중</button>
            </Link>
            <Link to="/">
              <button>홈</button>
            </Link>
          </div>
          <div className="current-time">
            <div className="text">현재 시간</div>
            <div className="tag">
              <FormatDate />
            </div>
          </div>
        </nav>

        <section className="section">
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
                <HabitList
                  key={habit.id}
                  habit={habit}
                  toggleCheckHabit={toggleCheckHabit}
                  checkedHabits={checkedHabits}
                />
              ))
            ) : (
              <p>
                아직 습관이 없어요
                <br />
                목록 수정을 눌러서 습관을 생성해 보세요
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
