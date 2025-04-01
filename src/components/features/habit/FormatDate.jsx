import dayjs from "dayjs";
import { useEffect, useState } from "react";

function FormatDate() {
  const [currentTime, setCurrentTime] = useState(dayjs()); // 현재 시간 저장

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs()); // 현재 시간 바뀌면 리렌더링
    }, 1000); // 1초마다 시간 업데이트

    return () => clearInterval(interval);
  }, []);

  return <div>{currentTime.format("YYYY-MM-DD A hh:mm")}</div>;
}

export default FormatDate;
