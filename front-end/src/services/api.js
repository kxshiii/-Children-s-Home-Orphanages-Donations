import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if different
  withCredentials: true,
});

export default API;
