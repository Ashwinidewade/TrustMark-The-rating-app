import axios from 'axios';

const API_URL = 'http://localhost:3001';

class RatingsService {
  async getRatings() {
    const response = await axios.get(`${API_URL}/ratings`);
    return response.data;
  }

  async getRating(id: number) {
    const response = await axios.get(`${API_URL}/ratings/${id}`);
    return response.data;
  }

  async getUserRatingForStore(storeId: number) {
    const response = await axios.get(`${API_URL}/ratings/user-rating/${storeId}`);
    return response.data;
  }

  async createRating(ratingData: any) {
    const response = await axios.post(`${API_URL}/ratings`, ratingData);
    return response.data;
  }

  async updateRating(id: number, ratingData: any) {
    const response = await axios.put(`${API_URL}/ratings/${id}`, ratingData);
    return response.data;
  }

  async deleteRating(id: number) {
    const response = await axios.delete(`${API_URL}/ratings/${id}`);
    return response.data;
  }
}

export const ratingsService = new RatingsService();