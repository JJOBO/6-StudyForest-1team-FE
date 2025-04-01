import "./HabitList.scss";

function HabitList({ habit, toggleCheckHabit, checkedHabits }) {
  return (
    <button
      className={
        habit.isActive && checkedHabits.includes(habit.id)
          ? "active"
          : "inactive"
      }
      onClick={() => toggleCheckHabit(habit)}
    >
      {habit.name}
    </button>
  );
}

export default HabitList;
