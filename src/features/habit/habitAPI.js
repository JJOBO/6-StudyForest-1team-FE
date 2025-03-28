import axios from "axios";

const BASE_URL = "https://studyforest-xdk5.onrender.com/study";

const habitAPI = {
  // 습관 목록 가져오기
  getHabits: async (studyId) => {
    const response = await axios.get(`${BASE_URL}/${studyId}/habits`);
    return response.data;
  },

  // 습관 수정하기
  updateHabit: async (studyId, habitId, updatedHabit) => {
    const response = await axios.patch(
      `${BASE_URL}/${studyId}/habits/${habitId}`,
      updatedHabit
    );
    return response.data; // 수정된 습관 데이터를 반환
  },

  // 습관 삭제하기
  deleteHabit: async (studyId, habitId) => {
    const response = await axios.delete(
      `${BASE_URL}/${studyId}/habits/${habitId}`
    );
    return response.data; // 삭제된 습관에 대한 정보를 반환 (없을 수도 있음)
  },

  // 새로운 습관 추가하기 (추가할 경우 POST 요청 사용)
  createHabit: async (studyId, newHabit) => {
    const response = await axios.post(`${BASE_URL}/${studyId}/habits`, newHabit);
    return response.data; // 추가된 습관 데이터 반환
  },
};

export default habitAPI;
