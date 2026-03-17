import axios from "axios";

// Direct connection to backend (proxy can drop multipart/form-data body)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
