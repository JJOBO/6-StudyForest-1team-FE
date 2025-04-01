import axios from "axios";

const API_BASE_URL = "https://studyforest-xdk5.onrender.com";

const getStudyList = async (
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
};

const createStudy = async (studyData) => {
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
};

const getStudyDetail = async (studyId, recentStudyIds = []) => {
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
};

const addEmojiToStudy = async (studyId, emoji) => {
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
};

const deleteStudy = async (studyId, password) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/study/${studyId}`, {
      data: { password },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting study ID ${studyId}:`, error);
    throw error;
  }
};

const updateStudy = async (studyId, studyData) => {
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
};

const studyAPI = {
  getStudyList,
  createStudy,
  getStudyDetail,
  addEmojiToStudy,
  deleteStudy,
  updateStudy,
};

export default studyAPI;
