import axios from 'axios';

const API_URL = 'http://localhost:3001';

class UsersService {
  async getUsers(filters: any = {}, page = 1, limit = 10, sortBy = 'name', sortOrder = 'ASC') {
    const params = {
      ...filters,
      page,
      limit,
      sortBy,
      sortOrder,
    };
    
    const response = await axios.get(`${API_URL}/users`, { params });
    return response.data;
  }

  async getUserStats() {
    const response = await axios.get(`${API_URL}/users/stats`);
    return response.data;
  }

  async getUser(id: number) {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  }

  async createUser(userData: any) {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  }

  async updateUser(id: number, userData: any) {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: number) {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  }
}

export const usersService = new UsersService();