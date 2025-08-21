import about from "../../../assets/images/about-1.png"
import about2 from "../../../assets/images/about-2.png"
import shape from "../../../assets/images/shape-3.png"
import shape2 from "../../../assets/images/shape-2.png"
import SectionTitle from "./SectionTile";

const AboutSection = () => {
    return (
        <div className="container mx-auto py-16 md:py-36 px-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px]">

                    {/* Main Image */}
                    <img
                        src={about}
                        alt="About main"
                        className="absolute top-0 left-0 w-full md:w-2/3 shadow-lg rounded-xl"
                    />

                    {/* Experience Card */}
                    <div
                        className="bg-white text-black absolute top-8 sm:top-16 md:top-24 right-4 sm:right-10 md:right-20 w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-lg flex flex-col py-6 sm:py-10 md:py-16 items-center justify-center gap-2 sm:gap-3 rounded-xl bg-no-repeat bg-cover"
                        style={{ backgroundImage: `url(${shape2})` }}
                    >
                        <span className="text-3xl sm:text-4xl md:text-5xl text-primary font-bold">25</span>
                        <span className="text-sm sm:text-base md:text-lg text-gray-600 font-semibold text-center">
                            YEARS EXPERIENCE
                        </span>
                    </div>

                    {/* Shape Decoration */}
                    <img
                        src={shape}
                        alt="Shape"
                        className="absolute top-4 sm:top-8 right-6 sm:right-10 md:right-20 w-1/3 sm:w-1/4 shadow-lg"
                    />

                    {/* Secondary Image */}
                    <img
                        src={about2}
                        alt="About secondary"
                        className="absolute -bottom-16 sm:-bottom-24 md:-bottom-20 right-4 sm:right-10 md:right-24 w-1/2 sm:w-1/3 shadow-lg rounded-xl"
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
                    <SectionTitle title="About Us"></SectionTitle>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl  mb-4 leading-16 font-bold">WELCOME WORLD WIDE BEST TRANSPORT COMPANY</h2>
                    <div className="flex items-center gap-5 py-4">
                        <div className="bg-primary h-16 w-2">
                        </div>
                        <p className="text-2xl ">
                            Competently implement efficient e-commerce without cross-unit growth strategies.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 py-3">
                        <div>
                            
                            <span>Unlimited Revisions</span>
                        </div>
                        <span>Unlimited Revisions</span>
                        <span>Unlimited Revisions</span>
                        <span>Unlimited Revisions</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;