export const API_BASE_URL = "http://localhost:8080/api/v1";
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USER_ROLE_ADMIN = 'ADMIN';
export const USER_ROLE_USER = 'USER';

export const INGREDIENT_TYPE_BISCUIT = 'BISCUIT';
export const INGREDIENT_TYPE_FILLING = 'FILLING';
export const INGREDIENT_TYPE_DECORATION = 'DECORATION';
export const INGREDIENT_STATUS_ACTIVE = 'ACTIVE';
export const INGREDIENT_STATUS_DELETED = 'DELETED';

export const ORDER_STATUS_CONFIRMED = 'CONFIRMED';
export const ORDER_STATUS_DECLINED = 'DECLINED';
export const ORDER_STATUS_NOT_CONFIRMED = 'NOT_CONFIRMED';