import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reflectionsAPI = {
  getAll: () => api.get('/reflections'),
  getByQuestionId: (questionId) => api.get(`/reflections/${questionId}`),
  save: (data) => api.post('/reflections', data),
};

export const skillsAPI = {
  getAll: () => api.get('/skills'),
  update: (id, data) => api.put(`/skills/${id}`, data),
};

export const weeklyReflectionsAPI = {
  getAll: () => api.get('/weekly-reflections'),
  getByDate: (date) => api.get(`/weekly-reflections/${date}`),
  save: (data) => api.post('/weekly-reflections', data),
};

export const dailyHabitsAPI = {
  getAll: (startDate, endDate) => api.get('/daily-habits', { params: { start_date: startDate, end_date: endDate } }),
  save: (data) => api.post('/daily-habits', data),
};

export const problemSignalsAPI = {
  getAll: () => api.get('/problem-signals'),
  save: (data) => api.post('/problem-signals', data),
  update: (id, data) => api.put(`/problem-signals/${id}`, data),
  delete: (id) => api.delete(`/problem-signals/${id}`),
};

export const experimentsAPI = {
  getByProblemId: (problemId) => api.get(`/experiments/${problemId}`),
  save: (data) => api.post('/experiments', data),
};

export const milestonesAPI = {
  getAll: () => api.get('/milestones'),
  update: (id, data) => api.put(`/milestones/${id}`, data),
  create: (data) => api.post('/milestones', data),
};

export const statsAPI = {
  get: () => api.get('/stats'),
};

export default api;
