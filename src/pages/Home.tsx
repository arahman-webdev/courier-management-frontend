import FeatureSection from '@/components/layout/Feature';
import Hero from '@/components/layout/Hero';
import AboutSection from '@/components/layout/Home/AboutSection';
import OurServiceSection from '@/components/layout/Home/OurServiceSection';
import React from 'react';

const Home = () => {
    return (
        <div>
            <div className='relative'>
                <Hero />
                <FeatureSection />
                <AboutSection />
                <FeatureSection />
                <OurServiceSection />
            </div>
        </div>
    );
};

export default Home;