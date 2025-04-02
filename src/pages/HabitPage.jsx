import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import habitAPI from "../components/features/habit/habitAPI";
import styles from "./HabitPage.module.scss";
import { Link } from "react-router-dom";
import HabitModal from "../components/features/habit/HabitModal";
import FormatDate from "../components/features/habit/FormatDate";
import HabitList from "../components/features/habit/HabitList";
import { useHabit } from "../components/features/study/habit/HabitContext";

export default function HabitPage() {
  const { studyId } = useParams();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedHabits, setCheckedHabits] = useState([]);
  const [studyName, setStudyName] = useState(null);
  const [studyNickName, setStudyNickName] = useState(null);
  const { triggerRefresh } = useHabit();
  const dayInNumber = (new Date().getDay() + 6) % 7;

  useEffect(() => {
    if (studyId) {
      Promise.all([
        habitAPI.getHabits(studyId),
        habitAPI.getCheckedHabits(studyId),
        habitAPI.getStudyInfo(studyId),
      ])
        .then(([habitsData, checkedData, studyData]) => {
          const sortedHabits = habitsData.sort((a, b) => a.id - b.id);
          setHabits(sortedHabits);

          const checked = checkedData
            .filter((habit) => habit.records[dayInNumber])
            .map((record) => record.habitId);
          console.log(
            dayInNumber,
            checkedData.filter((habit) => habit.records[dayInNumber])
          );
          setCheckedHabits(checked);

          setStudyNickName(studyData.creatorNick);
          setStudyName(studyData.name);
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

    const updatedHabits = isChecked
      ? checkedHabits.filter((id) => id !== habit.id)
      : [...checkedHabits, habit.id];

    setCheckedHabits(updatedHabits);

    try {
      if (isChecked) {
        await habitAPI.uncheckHabit(habit.id);
      } else {
        await habitAPI.checkHabit(habit.id);
      }
      triggerRefresh();
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
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.studyTitle}>
            {studyNickName}의 {studyName}
          </div>
          <div className={styles.links}>
            <Link to={`/${studyId}/focus`}>
              <button>오늘의 집중</button>
            </Link>
            <Link to="/">
              <button>홈</button>
            </Link>
          </div>
          <div className={styles.currentTime}>
            <div className={styles.text}>현재 시간</div>
            <div className={styles.tag}>
              <FormatDate />
            </div>
          </div>
        </nav>

        <section className={styles.section}>
          <div className={styles.habitBar}>
            <div className={styles.habitTitle}>오늘의 습관</div>
            <button onClick={openModal} className={styles.editBtn}>
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
          <div className={styles.habitList}>
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
      </div>
    </>
  );
}
