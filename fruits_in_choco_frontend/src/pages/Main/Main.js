import React, { useEffect } from 'react';
import Slider from './Slider/Slider';
import { useSelector } from 'react-redux';
import { scrollToTarget } from '../../util/routes';
import { Advantages } from './Advantages';
import { AboutUs } from './AboutUs';
import { SocialNetwork } from './SocialNetwork';
import { HowToOrder } from './HowToOrder';
import { Reviews } from './Reviews';
import { Categories } from './Categories';

const Main = () => {
    const slides = useSelector((state) => state.slideReducer.slides);

    useEffect(() => {
        const anchor = window.location.hash.split('#')[1];
        if (anchor) {
            scrollToTarget(anchor);
            scrollToTarget(anchor);
        }
    }, []);

    return (
        <main>
            <Slider slides={slides} />
            <Categories />
            <AboutUs />
            <HowToOrder />
            <Reviews />
            <SocialNetwork />
            <Advantages />
        </main>
    );
};

export default Main;
