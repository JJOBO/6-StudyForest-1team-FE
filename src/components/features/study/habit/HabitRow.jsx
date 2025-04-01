import React from "react";
import styles from "./HabitRow.module.scss";
import emptySticker from "../../../../assets/stickers/sticker_empty.svg";
import doneSticker from "../../../../assets/stickers/sticker_light_green_100_01.svg";

function HabitRow({ habitName, records }) {
  return (
    <>
      <div className={styles.habitName}>{habitName}</div>
      <div className={styles.habitCell}>
        {records.map((isDone, index) => {
          const stickerSrc = isDone ? doneSticker : emptySticker;

          return (
            <div key={index}>
              <img src={stickerSrc} alt="습관 체크 스티커" />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HabitRow;
