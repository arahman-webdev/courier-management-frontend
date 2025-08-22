import FeatureSection from '@/components/layout/Feature';
import Hero from '@/components/layout/Hero';
import AboutSection from '@/components/layout/Home/AboutSection';
import ChooseUs from '@/components/layout/Home/ChooseUs';
import OurServiceSection from '@/components/layout/Home/OurServiceSection';


const Home = () => {
    return (
        <div>
            <div className='relative'>
                <Hero />
                <FeatureSection />
                <AboutSection />
                <OurServiceSection />
                <ChooseUs />
            </div>
        </div>
    );
};

export default Home;