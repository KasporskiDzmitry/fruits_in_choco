import axios from 'axios';

import {API_BASE_URL} from './constants';
import store from '../redux/redux-store';
import {
    clearToken,
    fetchRefreshTokenBegin,
    fetchRefreshTokenFailure,
    fetchRefreshTokenSuccess
} from '../redux/actions/auth_actions';
import {removeUserInfoFromLS} from './localStorageFunctions';

class RequestService {
    get = (url, isAuthRequired = false, contentType = 'application/json') => {
        return createRequest('GET', url, null, isAuthRequired, contentType);
    };

    post = (
        url,
        body,
        isAuthRequired = false,
        contentType = 'application/json'
    ) => {
        return createRequest('POST', url, body, isAuthRequired, contentType);
    };

    put = (
        url,
        body,
        isAuthRequired = false,
        contentType = 'application/json'
    ) => {
        return createRequest('PUT', url, body, isAuthRequired, contentType);
    };

    delete = (
        url,
        isAuthRequired = false,
        contentType = 'application/json'
    ) => {
        return createRequest('DELETE', url, null, isAuthRequired, contentType);
    };
}

const createRequest = (method, path, body, isAuthRequired, contentType) => {
    return axios({
        method: method,
        url: API_BASE_URL + path,
        data: body,
        headers: setHeader(isAuthRequired, contentType),
        withCredentials: true,
    });
};

const setHeader = (isAuthRequired, contentType) => {
    const token = localStorage.getItem('token');
    if ((token && token.length > 0) || isAuthRequired) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    axios.defaults.headers.common['Content-Type'] = contentType;
};

// Response interceptor for API calls
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 ||
            (error.response.status === 403 && !originalRequest._retry)) {
            // TODO: need to monitor behavior
            store.dispatch(clearToken());
            localStorage.removeItem("token");
            originalRequest._retry = true;
            try {
                store.dispatch(fetchRefreshTokenBegin());
                const response = await new RequestService().post('/auth/refreshToken');
                store.dispatch(fetchRefreshTokenSuccess(response.data));
                localStorage.setItem("token", response.data);
                originalRequest.headers.Authorization = response.data;
                return axios(originalRequest);
            } catch (e) {
                removeUserInfoFromLS();
                store.dispatch(fetchRefreshTokenFailure(e));
                console.log(e);
                // window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default new RequestService();
