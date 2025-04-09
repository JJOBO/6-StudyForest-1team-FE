import styles from "./HabitList.module.scss";

function HabitList({ habit, toggleCheckHabit, checkedHabits }) {
  return (
    <button
      className={`${styles.habitList} ${
        habit.isActive && checkedHabits.includes(habit.id)
          ? styles.active
          : styles.inActive
      }`}
      onClick={() => toggleCheckHabit(habit)}
    >
      {habit.name}
    </button>
  );
}

export default HabitList;
