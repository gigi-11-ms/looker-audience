import axios from "axios";
import {
  AUDIENCES_API_TOKEN,
  AUDIENCES_BASE_URL,
  MAPPINGS_BASE_URL,
} from "../../constants";

const axiosInstance = axios.create({
  baseURL: AUDIENCES_BASE_URL,
  headers: {
    Authorization: `Bearer ${AUDIENCES_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const mappingsAxiosInstance = axios.create({
  baseURL: MAPPINGS_BASE_URL,
  headers: {
    Authorization: `Bearer ${AUDIENCES_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
