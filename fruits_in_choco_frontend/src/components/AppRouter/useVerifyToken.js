import React, {useEffect, useState} from 'react';
import RequestService from "../../api/RequestService";

export const useVerifyToken = (token) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (token) {
            verifyToken()
                .then(setIsValid)
                .catch(() => setIsValid(false));
        }
    }, [])

    const verifyToken = async () => {
        try {
            const response = await RequestService.post('/auth/verify-token', {}, true);
            return response.data === true;
        } catch (error) {
            return false;
        }
    }

    return isValid;
};