import {emailRegexp} from "../constants/url";

export const required = value => {
    if (value) return undefined;
    return "Field is required";
}

export const validateEmail = email => {
    if(String(email).toLowerCase().match(emailRegexp)) return undefined;
    return "Email is invalid";
}

export const maxLengthCreator = (maxLength) => value => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
};

export const number = value => value && isNaN(Number(value)) ? "Только число" : undefined;
