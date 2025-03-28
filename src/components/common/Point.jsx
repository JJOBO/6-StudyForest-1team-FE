import React, { useEffect, useState } from "react";
import axios from "axios";

function Point({ userId }) {
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(
          `https://studyforest-xdk5.onrender.com/user/${userId}/points`
        );
        setPoints(response.data.points);
      } catch (error) {
        console.error(`Error fetching points for user ID ${userId}:`, error);
      }
    };

    if (userId) {
      fetchPoints();
    }
  }, [userId]);

  return (
    <div>
      {points !== null ? <p>{points} 획득</p> : <p>Loading points...</p>}
    </div>
  );
}

export default Point;
