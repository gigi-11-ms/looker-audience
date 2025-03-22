import axios from "axios";
import { API_BASE_URL, AUDIENCES_API_TOKEN, AUDIENCES_BASE_URL } from "../../constants";

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

export const audiencesInstance = axios.create({
    baseURL: AUDIENCES_BASE_URL,
    headers: {
      Authorization: `Bearer ${AUDIENCES_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

export default axiosInstance;
