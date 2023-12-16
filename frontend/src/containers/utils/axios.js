import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://3.111.231.253:5000/api', // Replace with your API URL
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true, // If needed for cross-origin requests
    },
  });
  
  // Apply the authcheck middleware to the Axios instance
  axiosInstance.interceptors.request.use(
    async (config) => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const token=user.token
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  export default axiosInstance;