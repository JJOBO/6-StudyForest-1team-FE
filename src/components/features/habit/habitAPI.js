import axios from "axios";

const BASE_URL = "https://studyforest-xdk5.onrender.com/study";

const habitAPI = {
  // 통합 API 추가
  getDashboardData: async (studyId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${studyId}/habits/dashboard`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },

  authenticateHabit: async (studyId, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/${studyId}/habits/auth`, {
        password,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error authenticating habit for study ID ${studyId}:`,
        error
      );
      throw error;
    }
  },

  // 습관 수정하기
  updateHabit: async (habitId, updatedHabit) => {
    const response = await axios.patch(
      `${BASE_URL}/habits/${habitId}`,
      updatedHabit
    );
    return response.data; // 수정된 습관 데이터를 반환
  },

  // 습관 삭제하기
  deleteHabit: async (habitId) => {
    const response = await axios.delete(`${BASE_URL}/habits/${habitId}`);
    return response.data; // 삭제된 습관에 대한 정보를 반환 (없을 수도 있음)
  },

  // 새로운 습관 추가하기 (추가할 경우 POST 요청 사용)
  createHabit: async (studyId, newHabit) => {
    const response = await axios.post(
      `${BASE_URL}/${studyId}/habits`,
      newHabit
    );
    return response.data; // 추가된 습관 데이터 반환
  },

  // 이번주 체크된 습관 가져오기
  getCheckedHabits: async (studyId) => {
    const response = await axios.get(`${BASE_URL}/${studyId}/habits/week`);
    return response.data;
  },

  // 습관 체크하기
  checkHabit: async (habitId) => {
    const response = await axios.post(`${BASE_URL}/habits/${habitId}/check`);
    return response.data;
  },

  // 습관 체크 해제하기
  uncheckHabit: async (habitId) => {
    const response = await axios.delete(
      `${BASE_URL}/habits/${habitId}/uncheck`
    );
    return response.data;
  },
};

export default habitAPI;
