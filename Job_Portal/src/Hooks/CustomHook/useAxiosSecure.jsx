
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://dev-hunt-job-portal-server.onrender.com",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      res => res,
      err => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.warn(" Token expired or invalid. Logging out...");
          signOutUser()
            .then(() => {
              navigate("/signin");
            })
            .catch(console.error);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
