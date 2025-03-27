import axios from "axios";

const instance = axios.create({
  baseURL: "https://studyforest-xdk5.onrender.com/study",
});

export const getHabitList = async (studyId) => {
  try {
    const res = await instance.get(`/${studyId}/habits`);
    return res.data;
  } catch (e) {
    console.error("습관 목록을 불러올 수 없습니다.", e);
    return [];
  }
};
