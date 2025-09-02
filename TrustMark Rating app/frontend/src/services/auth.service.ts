// client/src/services/auth.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const authService = {
  setToken: (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  login: async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; // ✅ already parsed
  },

  register: async (userData: any) => {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data; // ✅ already parsed
  },
};
