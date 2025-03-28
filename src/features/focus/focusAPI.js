import axios from "axios";

// Axios 인스턴스 생성 (기본 URL 설정 등)
const client = axios.create({
  baseURL: "http://localhost:5000", // 백엔드 서버(수정 예정)
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 집중 시작
 */
const startFocus = async (studyId, targetTime) => {
  const response = await client.post(`/study/${studyId}/focus`, { targetTime });
  return response.data;
};

/**
 * 집중 종료
 */
const stopFocus = async (studyId, elapsedTime, targetTime) => {
  const response = await client.put(`/study/${studyId}/focus`, {
    elapsedTime,
    targetTime,
  });
  return response.data;
};

const focusAPI = {
  startFocus,
  stopFocus,
};

export default focusAPI;
