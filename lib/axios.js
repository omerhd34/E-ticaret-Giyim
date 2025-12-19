import axios from 'axios';

// Axios instance oluştur
const axiosInstance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
 withCredentials: true, // credentials: 'include' yerine
 headers: {
  'Content-Type': 'application/json',
 },
});

export default axiosInstance;