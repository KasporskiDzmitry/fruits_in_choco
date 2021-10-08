import React from 'react';
import axios, {Method} from 'axios';

import {API_BASE_URL} from "../components/utils/constants/url";

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
        headers: setHeader(isAuthRequired, contentType)
    });
};

const setHeader = (isAuthRequired, contentType) => {
    if (isAuthRequired) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
    axios.defaults.headers.common["Content-Type"] = contentType
};

const responseSuccessHandler = response => {
    return response;
};

const responseErrorHandler = error => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = '/login';
        }

    } else if (error.request) {
        console.error(error.request);
    } else {
        console.error('Error', error.message);
    }

    return Promise.reject(error);
};

axios.interceptors.response.use(
    response => responseSuccessHandler(response),
    error => responseErrorHandler(error)
);

export default new RequestService();