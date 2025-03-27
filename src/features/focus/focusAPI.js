// src/features/focus/focusAPI.js

import axios from 'axios';

const client = axios.create({
  baseURL: 'https://studyforest-xdk5.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getStudyInfo = async (id) => {
  try {
    const response = await client.get(`/study/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch study info:', error);
    throw error;
  }
};

const updateStudyPoint = async (updatedPoint) => {
  try {
    await client.post('/updatePoint', { updatedPoint });
  } catch (error) {
    console.error('Failed to update study point:', error);
    throw error;
  }
};


const focusAPI = {
  getStudyInfo,
  updateStudyPoint,
};

export default focusAPI;


