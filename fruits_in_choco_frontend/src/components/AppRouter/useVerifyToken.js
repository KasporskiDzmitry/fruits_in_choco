import React, {useEffect, useState} from 'react';
import RequestService from "../../api/RequestService";

export const useVerifyToken = (token) => {


    useEffect(() => {
        if (token){
            verifyToken(token);
        }
    }, [token])

    const verifyToken = async () => {
        const response = await RequestService.post('/auth/verify-token', {}, true);
        console.log(response)
    }

    return true;
};