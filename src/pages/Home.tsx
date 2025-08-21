import FeatureSection from '@/components/layout/Feature';
import Hero from '@/components/layout/Hero';
import AboutSection from '@/components/layout/Home/AboutSection';
import React from 'react';

const Home = () => {
    return (
        <div>
            <div className='relative'>
                <Hero />
                <FeatureSection />
                <AboutSection />
                                <FeatureSection />
            </div>
        </div>
    );
};

export default Home;