import React, {useEffect, useState} from 'react';
import RequestService from "../../api/RequestService";

const categoryID = {
    'cakes': 3,
    'cupcakes': 1,
    'cakepopses': 2,
    'bentoes': 4,
};

export const useFetchProduct = (productType) => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = async (id) => {
        try {
            setLoading(true);
            const response = await RequestService.get(`/categories/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Ошибка загрузки данных');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const id = categoryID[productType];
        if (id) {
            fetchProduct(id);
        } else {
            console.error(`Invalid product type: ${productType.type}`);
        }
    }, [ productType])

    if (!categoryID[productType]){
        setError('Несуществующая категория товара');
    }

    return {product, loading, error};
};