import axios from "axios";

// Direct connection to backend (proxy can drop multipart/form-data body)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default API;
