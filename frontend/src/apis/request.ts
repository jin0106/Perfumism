import axios, { AxiosInstance } from "axios";
import cookie from "react-cookies";
import authApi from "./auth";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config) => {
			const token = cookie.load("access_token");
			if (config.headers && token) config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		(error) => Promise.reject(error),
	);
	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			const index = cookie.load("index");
			const access_token = cookie.load("access_token");
			if (error.response.status === 403) {
				authApi.reissue({ index, access_token }).then(() => instance.request(error.config));
			}
			toast.error(error.response.data.error_message);
			return Promise.reject(error);
		},
	);
	return instance;
};

const createInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_MAIN_URL,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
	});
	return setInterceptors(instance);
};

const djangoCreateInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_SUB_URL,
		timeout: 10000,
	});
	return instance;
};

export const request = createInstance();
export const djangoRequest = djangoCreateInstance();
