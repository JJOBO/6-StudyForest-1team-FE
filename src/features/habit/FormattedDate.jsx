import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect } from "react";
dayjs.locale("ko");
import { useState } from "react";

const FormattedDate = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="current-time">
      {currentTime.format("YYYY-MM-DD A hh:mm")}
    </span>
  );
};

export default FormattedDate;
