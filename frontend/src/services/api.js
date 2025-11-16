import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Vocabulary endpoints
export const vocabularyAPI = {
  getAll: (params) => api.get('/vocabulary', { params }),
  getByCategory: (category) => api.get(`/vocabulary/category/${category}`),
  getRandom: (params) => api.get('/vocabulary/random', { params }),
  updateProgress: (data) => api.post('/vocabulary/progress', data),
  getProgress: () => api.get('/vocabulary/progress'),
};

export default api;
