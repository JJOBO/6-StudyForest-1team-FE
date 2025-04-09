import axios from "axios";

const client = axios.create({
  baseURL: "https://studyforest-xdk5.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 비밀번호 인증
 */
const authenticateFocus = async (studyId, password) => {
  try {
    const response = await client.post(`/study/${studyId}/focus/auth`, {
      password,
    });
    return response.data;
  } catch (error) {
    console.error(`Error authenticating focus for study ID ${studyId}:`, error);
    throw error;
  }
};

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

const getStudyInfo = async (id) => {
  try {
    const response = await client.get(`/study/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch study info:", error);
    throw error;
  }
};

const updateStudyPoint = async (updatedPoint) => {
  try {
    await client.post("/updatePoint", { updatedPoint });
  } catch (error) {
    console.error("Failed to update study point:", error);
    throw error;
  }
};

const focusAPI = {
  startFocus,
  stopFocus,
  getStudyInfo,
  updateStudyPoint,
  authenticateFocus,
};

export default focusAPI;
