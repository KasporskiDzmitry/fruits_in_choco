import React from 'react';
import { Title } from './Title';
import { useParams } from 'react-router-dom';
import { BiscuitAndFilling } from './BiscuitAndFilling';
import { DecorIdeas } from './DecorIdeas';
import { HowToOrder } from '../Main/HowToOrder';
import { Advantages } from '../Main/Advantages';
import { useFetchProduct } from '../Main/useFetchProduct';
import Preloader from '../../components/common/Preloader/Preloader';

export const ProductType = () => {
    const productType = useParams();

    const { product, loading, error } = useFetchProduct(productType.type);

    if (loading) {
        return <Preloader />;
    }

    if (error || !product) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Title
                title={product.title}
                titleImage={product.mainImageURL}
                description={product.description}
            />
            <BiscuitAndFilling setOfBisquitAndFilling={product.fillings} />
            <DecorIdeas setOfDecorIdeas={product.decors} />
            <HowToOrder />
            <Advantages />
        </div>
    );
};
