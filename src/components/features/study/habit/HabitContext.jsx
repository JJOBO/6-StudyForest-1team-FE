import { createContext, useContext, useState } from "react";

const HabitContext = createContext();

export const useHabit = () => useContext(HabitContext);

export function HabitProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <HabitContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </HabitContext.Provider>
  );
}
