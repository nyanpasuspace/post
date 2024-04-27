import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PATH = import.meta.env.VITE_API_PATH;
const API_URL = API_BASE_URL + PATH;

const instance = axios.create({
  baseURL: API_URL,
});

export { instance }