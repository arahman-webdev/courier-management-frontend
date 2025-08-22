import about from "../../../assets/images/about-1.png"
import about2 from "../../../assets/images/about-2.png"
import shape from "../../../assets/images/shape-3.png"
import shape2 from "../../../assets/images/shape-2.png"
import bg from "../../../assets/images/bg.png"
import SectionTitle from "./SectionTile";
import { CheckCheck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

function Counter({ end }: { end: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // runs only once when visible

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, { duration: 3 });
      return controls.stop;
    }
  }, [isInView, end, count]);

  return (
    <motion.span ref={ref}>
      {rounded}
    </motion.span>
  );
}

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
                        <div className="flex gap-2">
                            <CheckCheck className="bg-primary rounded-full" />
                            <span>Unlimited Revisions</span>
                        </div>
                        <div className="flex gap-2">
                            <CheckCheck className="bg-primary rounded-full" />
                            <span>Best Fitness Excercise</span>
                        </div>
                        <div className="flex gap-2">
                            <CheckCheck className="bg-primary rounded-full" />
                            <span>Combine Fitness and</span>
                        </div>
                        <div className="flex gap-2">
                            <CheckCheck className="bg-primary rounded-full" />
                            <span>Best Solutions</span>
                        </div>
                    </div>
                    <div>
                        <Separator />
                    </div>
                    <div className="pt-10 w-full">
                        <Button className="rounded-none px-8 py-7 w-full">
                            ABOUT MORE
                        </Button>
                    </div>
                </div>
            </div>
            <div className="pt-28">
                {/* Thin top line */}
                <div className="bg-primary w-full h-1" />

                {/* Background Section */}
                <div
                    style={{ backgroundImage: `url(${bg})` }}
                    className="border-t border-primary bg-cover bg-center"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 lg:p-16">

                        {/* Stat Item */}
                        <div className="flex flex-col items-center text-center relative">
                            <span className="text-primary text-4xl sm:text-5xl font-extrabold"> <Counter end={3000} />+</span>
                            <h2 className="text-lg sm:text-xl font-semibold mt-2 text-white">PROJECT COMPLETE</h2>
                            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xs">
                                Successfully delivered thousands of projects across multiple industries,
                                ensuring high-quality and timely execution.
                            </p>
                            <div className="hidden lg:block absolute top-0 right-0 h-full w-px bg-primary"></div>
                        </div>

                        {/* Stat Item */}
                        <div className="flex flex-col items-center text-center relative">
                            <span className="text-primary text-4xl sm:text-5xl font-extrabold"><Counter end={300} />+ </span>
                            <h2 className="text-lg sm:text-xl font-semibold mt-2 text-white">BEST EMPLOYEES</h2>
                            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xs">
                                A dedicated team of skilled professionals committed to driving
                                innovation and delivering excellence every day.
                            </p>
                            <div className="hidden lg:block absolute top-0 right-0 h-full w-px bg-primary"></div>
                        </div>

                        {/* Stat Item */}
                        <div className="flex flex-col items-center text-center relative">
                            <span className="text-primary text-4xl sm:text-5xl font-extrabold"><Counter end={350} />+</span>
                            <h2 className="text-lg sm:text-xl font-semibold mt-2 text-white">WORLD AWARDS</h2>
                            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xs">
                                Recognized globally with awards for outstanding performance,
                                innovation, and consistent customer satisfaction.
                            </p>
                            <div className="hidden lg:block absolute top-0 right-0 h-full w-px bg-primary"></div>
                        </div>

                        {/* Stat Item */}
                        <div className="flex flex-col items-center text-center">
                            <span className="text-primary text-4xl sm:text-5xl font-extrabold"><Counter end={700}/>+</span>
                            <h2 className="text-lg sm:text-xl font-semibold mt-2 text-white">HAPPY CLIENTS</h2>
                            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xs">
                                Trusted by businesses and individuals worldwide who continue
                                to rely on us for their success and growth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AboutSection;