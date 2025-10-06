import axios from "axios";
import Swal from "sweetalert2";
const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    if (error.code == "ERR_NETWORK") {
      Swal.fire("network error");
      return;
    } else if (error.response.status == 404) {
      Swal.fire("Api not found");
      return;
    } else if (error.response.status == 500) {
      Swal.fire("Server.error");
      return;
    } else if (error.response.data) {
      return Promise.reject(error.response.data);
    }
  }
);

export default axiosInstance;
