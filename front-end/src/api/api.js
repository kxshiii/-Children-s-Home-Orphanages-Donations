import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchHomes = () => api.get('/homes/');
export const fetchHome = (id) => api.get(`/homes/${id}`);
export const createHome = (home) => api.post('/homes', home);
export const deleteHome = (id) => api.delete(`/homes/${id}`);
export const updateHome = (home) => api.put(`/homes/${home.id}`, home);
