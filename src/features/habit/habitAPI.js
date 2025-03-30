import axios from "axios";

const BASE_URL = "https://studyforest-xdk5.onrender.com/study";

const habitAPI = {
  // 습관 목록 가져오기
  getHabits: async (studyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${studyId}/habits`);
      return response.data;
    } catch (error) {
      console.error(
        "습관 목록 가져오기 오류:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 습관 수정하기
  updateHabit: async (habitId, updatedHabit) => {
    try {
      console.log(`PATCH 요청 URL: ${BASE_URL}/habits/${habitId}`);
      const response = await axios.patch(
        `${BASE_URL}/habits/${habitId}`,
        updatedHabit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("습관 수정 오류:", error.response?.data || error.message);
      throw error;
    }
  },

  // 습관 삭제하기
  deleteHabit: async (habitId) => {
    try {
      console.log(`DELETE 요청 URL: ${BASE_URL}/habits/${habitId}`);
      const response = await axios.delete(`${BASE_URL}/habits/${habitId}`);

      console.log("DELETE 요청 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("습관 삭제 오류:", error.response?.data || error.message);
      throw error;
    }
  },

  // 새로운 습관 추가하기 (POST 요청)
  createHabit: async (studyId, newHabit) => {
    try {
      console.log(`POST 요청 URL: ${BASE_URL}/${studyId}/habits`); // 디버깅 로그
      const response = await axios.post(
        `${BASE_URL}/${studyId}/habits`,
        newHabit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("POST 요청 응답:", response.data); // 응답 로그 추가
      return response.data;
    } catch (error) {
      console.error("습관 추가 오류:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default habitAPI;
