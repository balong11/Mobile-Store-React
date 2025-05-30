import axios from "axios";
import { BASE_API } from "../shared/constants/app";
import store from "../redux-setup/store";
import { refreshToken } from "./Api";
import { updateAccessToken } from "../redux-setup/reducers/auth";
const Http = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});
Http.interceptors.request.use(
  async (config) => {
    // Add any custom headers or configurations here (logic code)
    const accessToken = await store.getState().auth.login.currentCustomer
      ?.accessToken;
    if (accessToken) {
      config.headers["token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
Http.interceptors.response.use(
  async (response) => {
    // Handle response data
    console.log(response.data);

    return response;
  },
  async (error) => {
    // Handle response error
    const response = error.response;
    if (response.data === "Token expired") {
      if (response.config.url.indexOf("/customer/refreshtoken") >= 0)
        return Promise.reject(error);
      const data = (await refreshToken()).data;
      
      const newAccessToken = data.accessToken;
      console.log(`newAccessToken::${newAccessToken}`);

      store.dispatch(updateAccessToken({ newAccessToken }));
      response.config.headers["token"] = `Bearer ${newAccessToken}`;
      return Http(response.config); // Retry the request with the new token
    }
    return Promise.reject(error);
  }
);
export default Http;
