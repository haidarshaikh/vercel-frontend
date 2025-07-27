// src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://mongo-backend-04jh.onrender.com/',
});
