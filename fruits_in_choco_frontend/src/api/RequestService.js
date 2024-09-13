import axios from 'axios';

import { API_BASE_URL } from '../util/constants';
import store from '../redux/redux-store';
import {
    clearToken,
    fetchRefreshTokenBegin,
    fetchRefreshTokenFailure,
    fetchRefreshTokenSuccess,
} from '../redux/actions/auth_actions';
import { removeUserInfoFromLS } from '../util/localStorageFunctions';

class RequestService {
    get = (url, isAuthRequired = false, contentType = 'application/json') => {
        return createRequest('GET', url, null, isAuthRequired, contentType);
    };

    post = (url, body, isAuthRequired = false, contentType = 'application/json') => {
        return createRequest('POST', url, body, isAuthRequired, contentType);
    };

    put = (url, body, isAuthRequired = false, contentType = 'application/json') => {
        return createRequest('PUT', url, body, isAuthRequired, contentType);
    };

    delete = (url, isAuthRequired = false, contentType = 'application/json') => {
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
    if (token && token.length > 0 && isAuthRequired) {
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
         const notRetriableRequest = [
             "http://localhost:8080/api/v1/auth/login",
             "http://localhost:8080/api/v1/auth/refresh-token"
         ]

         let originalRequest = error.config;
         const httpStatus = error.response.status;

         if (error.response.data.message === 'JWT token is invalid') {
             removeUserInfoFromLS();
             return Promise.reject('Token is invalid');
         }

         if ((httpStatus === 401 || httpStatus === 403) && !originalRequest._retry && !notRetriableRequest.includes(originalRequest.url)) {
             store.dispatch(clearToken());
             localStorage.removeItem('token');
             originalRequest._retry = true;
             try {
                 store.dispatch(fetchRefreshTokenBegin());
                 const response = await new RequestService().post('/auth/refresh-token');
                 const token = response.data;

                 store.dispatch(fetchRefreshTokenSuccess(token));
                 localStorage.setItem('token', token);

                 originalRequest = {
                     ...originalRequest,
                     headers: {
                         ...originalRequest.headers,
                         Authorization: token,
                     },
                 };

                 return axios(originalRequest);
             } catch (e) {
                 console.error(e);
                 removeUserInfoFromLS();
                 store.dispatch(fetchRefreshTokenFailure(e));
             }
         }
         return Promise.reject(error);
     }
);

export default new RequestService();