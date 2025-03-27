import axios from "axios";

const API_BASE_URL = "https://studyforest-xdk5.onrender.com";

const studyAPI = {
  getStudyList: async (
    keyword = "",
    order = "createdAt",
    offset = 0,
    recentStudyIds = []
  ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/study-list`, {
        params: {
          keyword,
          order,
          offset,
        },
        headers: {
          recentstudyids: JSON.stringify(recentStudyIds),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching study list:", error);
      throw error;
    }
  },

  createStudy: async (studyData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/study/registration`,
        studyData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating study:", error);
      throw error;
    }
  },

  getStudyDetail: async (studyId, recentStudyIds = []) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/study/${studyId}`, {
        headers: {
          recentstudyids: JSON.stringify(recentStudyIds),
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching study detail for ID ${studyId}:`, error);
      throw error;
    }
  },

  addEmojiToStudy: async (studyId, emoji) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/study/${studyId}/emoji`,
        { emoji }
      );
      return response.data;
    } catch (error) {
      console.error(`Error adding emoji to study ID ${studyId}:`, error);
      throw error;
    }
  },

  deleteStudy: async (studyId, password) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/study/${studyId}`, {
        data: { password },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting study ID ${studyId}:`, error);
      throw error;
    }
  },

  updateStudy: async (studyId, studyData) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/study/${studyId}`,
        studyData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating study ID ${studyId}:`, error);
      throw error;
    }
  },
};

export default studyAPI;
