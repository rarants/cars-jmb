import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL: "http://127.0.0.1:3333"
});
api.interceptors.request.use(async api_config => {
const token = getToken();
if (token) api_config.headers.Authorization = `Bearer ${token}`;
    return api_config;
})
export default api;
      
