import React from 'react';
import Carousel from '../components/Carrosel';
import Advertise from '../components/Advertise';
import ReviewSection from '../components/ReviewSection';
import FaQ from '../components/ExtraSections/FaQ';
import Partner from '../components/ExtraSections/Partner';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Advertise></Advertise>
            <ReviewSection></ReviewSection>
            <FaQ></FaQ>
            <Partner></Partner>
        </div>
    );
};

export default Home;