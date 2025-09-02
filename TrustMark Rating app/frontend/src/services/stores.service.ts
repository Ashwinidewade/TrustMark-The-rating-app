import axios from 'axios';

const API_URL = 'http://localhost:3001';

class StoresService {
  async getStores(filters: any = {}, page = 1, limit = 10, sortBy = 'name', sortOrder = 'ASC') {
    const params = {
      ...filters,
      page,
      limit,
      sortBy,
      sortOrder,
    };
    
    const response = await axios.get(`${API_URL}/stores`, { params });
    return response.data;
  }

  async getStoreStats() {
    const response = await axios.get(`${API_URL}/stores/stats`);
    return response.data;
  }

  async getStore(id: number) {
    const response = await axios.get(`${API_URL}/stores/${id}`);
    return response.data;
  }

  async getStoreRatings(storeId: number) {
    const response = await axios.get(`${API_URL}/stores/${storeId}/ratings`);
    return response.data;
  }

  async createStore(storeData: any) {
    const response = await axios.post(`${API_URL}/stores`, storeData);
    return response.data;
  }

  async updateStore(id: number, storeData: any) {
    const response = await axios.put(`${API_URL}/stores/${id}`, storeData);
    return response.data;
  }

  async deleteStore(id: number) {
    const response = await axios.delete(`${API_URL}/stores/${id}`);
    return response.data;
  }
}

export const storesService = new StoresService();