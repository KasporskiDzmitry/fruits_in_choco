import React from 'react';
import { Title } from './Title';
import { useParams } from 'react-router-dom';
import { BiscuitAndFilling } from './BiscuitAndFilling';
import { DecorIdeas } from './DecorIdeas';
import { HowToOrder } from '../Main/HowToOrder';
import { Advantages } from '../Main/Advantages';

const Enum = {
    cakes: 'Торты',
    cupcakes: 'Капкейки',
    cakepopses: 'Кейкпопсы',
    bentoes: 'Бенто',
};

const sampleObject = {
    titleImage: 'https://www.dropbox.com/scl/fi/11up2opd3mn0te5xjqaq5/Battery3.jpg?rlkey=8btagrusavier4ng2qeghvcj3&st=s884d7vw&dl=1',
    description: 'fsdfsdfsdf',
    bisquitAndFilling: [
        {id: 1, title: 'chocolate', text: 'very tasteful', imageURL: 'https://www.dropbox.com/scl/fi/11up2opd3mn0te5xjqaq5/Battery3.jpg?rlkey=8btagrusavier4ng2qeghvcj3&st=s884d7vw&dl=1'},
        {id: 2, title: 'cherry', text: 'very ', imageURL: 'https://www.dropbox.com/scl/fi/11up2opd3mn0te5xjqaq5/Battery3.jpg?rlkey=8btagrusavier4ng2qeghvcj3&st=s884d7vw&dl=1'},
        {id: 3, title: 'banana', text: ' tasteful', imageURL: 'https://www.foodandwine.com/thmb/dNEcc_lhIGgwLVuSimrf2eaAuBM=/2000x1333/filters:fill(auto,1)/chocolate-cupcakes-FT-RECIPE1221-e7e99dee29ad4a9db7a169d7c41f4f79.jpg'},
    ],
    decorIdeas: [
        {id: 1, title: 'chocolate', text: 'very tasteful', imageURL: 'https://www.dropbox.com/scl/fi/11up2opd3mn0te5xjqaq5/Battery3.jpg?rlkey=8btagrusavier4ng2qeghvcj3&st=s884d7vw&dl=1'},
        {id: 2, title: 'banana', text: 'very tasteful', imageURL: 'https://www.dropbox.com/scl/fi/11up2opd3mn0te5xjqaq5/Battery3.jpg?rlkey=8btagrusavier4ng2qeghvcj3&st=s884d7vw&dl=1'},
        {id: 3, title: 'cherry', text: 'very tasteful', imageURL: 'https://www.dropbox.com/scl/fi/11up2opd3mn0te5xjqaq5/Battery3.jpg?rlkey=8btagrusavier4ng2qeghvcj3&st=s884d7vw&dl=1'},
        {id: 4, title: 'sdfsdf', text: 'very tasteful', imageURL: 'https://www.dropbox.com/scl/fi/11up2opd3mn0te5xjqaq5/Battery3.jpg?rlkey=8btagrusavier4ng2qeghvcj3&st=s884d7vw&dl=1'},
        {id: 5, title: 'dfgdfdfg', text: 'very tasteful', imageURL: 'https://www.foodandwine.com/thmb/dNEcc_lhIGgwLVuSimrf2eaAuBM=/2000x1333/filters:fill(auto,1)/chocolate-cupcakes-FT-RECIPE1221-e7e99dee29ad4a9db7a169d7c41f4f79.jpg'},
    ]
}

export const ProductType = () => {
    const productType = useParams();

    return (
        <div>
            <Title title={Enum[productType.type]} titleImage={sampleObject.titleImage} description={sampleObject.description}/>
            <BiscuitAndFilling setOfBisquitAndFilling={sampleObject.bisquitAndFilling} />
            <DecorIdeas setOfDecorIdeas={sampleObject.decorIdeas}/>
            <HowToOrder />
            <Advantages />
        </div>
    );
};
