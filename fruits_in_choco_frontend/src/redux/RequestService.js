import axios from 'axios';

import {API_BASE_URL} from "../components/utils/constants/url";
import store from "./redux-store";
import {clearToken, refreshTokenSuccess} from "./actions/auth_actions";
import {removeUserInfoFromLS} from "../components/utils/localStorageFunctions";

class RequestService {
    get = (url, isAuthRequired = false, contentType = "application/json") => {
        return createRequest("GET", url, null, isAuthRequired, contentType);
    };

    post = (url, body, isAuthRequired = false, contentType = "application/json") => {
        return createRequest("POST", url, body, isAuthRequired, contentType);
    };

    put = (url, body, isAuthRequired = false, contentType = "application/json") => {
        return createRequest("PUT", url, body, isAuthRequired, contentType);
    };

    delete = (url, isAuthRequired = false, contentType = "application/json") => {
        return createRequest("DELETE", url, null, isAuthRequired, contentType);
    };
}

const createRequest = (method, url, body, isAuthRequired, contentType) => {
    return axios({
        method: method,
        url: API_BASE_URL + url,
        data: body,
        headers: setHeader(isAuthRequired, contentType),
        withCredentials: true
    });
};

const setHeader = (isAuthRequired, contentType) => {
    const state = store.getState();
    const token = state.authReducer.token;
    if ((token && token.length > 0) || isAuthRequired) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
    axios.defaults.headers.common["Content-Type"] = contentType
};

// Response interceptor for API calls
axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        store.dispatch(clearToken());
        originalRequest._retry = true;
        try {
            const response = await new RequestService().post("/auth/refreshToken");
            store.dispatch(refreshTokenSuccess(response.data));
            originalRequest.headers.Authorization = response.data;
            return axios(originalRequest);
        } catch (e) {
            removeUserInfoFromLS();
            window.location.href = '/';
        }
    }
    return Promise.reject(error);
});

export default new RequestService();