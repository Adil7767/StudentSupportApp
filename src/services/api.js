import axios from 'axios';

const API_BASE_URL = 'https://api-student-support-app.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 