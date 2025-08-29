import { apiClient } from './api';
import { Set } from '../types';

export const setsApi = {
  getSets: async (): Promise<Set[]> => {
    const response = await apiClient.get<Set[]>('/sets');
    return response.data;
  },
};
