import { Clock, MapPin, Package, Plane, Truck } from "lucide-react";
import SectionTitle from "./SectionTile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ServiceCard from "./ServiceCard";
import Autoplay from "embla-carousel-autoplay"; // ✅ Autoplay plugin
import { useRef } from "react";
const OurServiceSection = () => {



  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) // 3s autoplay, keep going
  );
  const services = [
    {
      title: "Fast Air Delivery",
      description: "Swift international shipping through reliable air freight.Every parcel is packaged and handled with maximum care. We pick up and deliver directly to your customer’s doorstep.Track your parcels live with our modern tracking system.",
      icon: <Plane size={60} />,
      bgImage:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Secure Parcel Handling",
      description: "Every parcel is packaged and handled with maximum care. Reliable truck transport across all major cities and districts. We pick up and deliver directly to your customer’s doorstep.Track your parcels live with our modern tracking system.",
      icon: <Package size={60} />,
      bgImage:
        "https://i.ibb.co.com/C3VJYC8H/secure.png",
    },
    {
      title: "Nationwide Trucking",
      description:
        "Reliable truck transport across all major cities and districts. We pick up and deliver directly to your customer’s doorstep. We pick up and deliver directly to your customer’s doorstep.Track your parcels live with our modern tracking system.",
      icon: <Truck size={60} />,
      bgImage:
        "https://i.ibb.co.com/LDnPxFv1/track.webp",
    },
    {
      title: "Door-to-Door Service",
      description: "We pick up and deliver directly to your customer’s doorstep.Track your parcels live with our modern tracking system. We pick up and deliver directly to your customer’s doorstep.Track your parcels live with our modern tracking system.",
      icon: <MapPin size={60} />,
      bgImage:
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your parcels live with our modern tracking system. We pick up and deliver directly to your customer’s doorstep.Track your parcels live with our modern tracking system.",
      icon: <Clock size={60} />,
      bgImage:
        "https://i.ibb.co.com/y2FKgCF/tracking.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-16">
      {/* Section Header */}
      <div className="space-y-5 py-7 text-center">
        <SectionTitle title="Our Services" />
        <h2 className="text-5xl font-bold">OUR SERVICE FOR YOU</h2>
        <p className="text-xl text-gray-600">
          Delivering speed, security, and reliability for all your parcel needs.
          <br />
          From local deliveries to international shipping — we’ve got you covered.
        </p>
      </div>

      {/* Carousel with autoplay + loop */}
      <Carousel
        plugins={[autoplay.current]} // ✅ autoplay enabled
        opts={{
          align: "start",
          loop: true, // ✅ infinite loop
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 p-4"
            >
              <ServiceCard {...service} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mr-44">
          <CarouselPrevious className="hover:bg-primary shadow-2xl" />
          <CarouselNext className="hover:bg-primary text-6xl transition-all ease-in-out shadow-2xl" />
        </div>
      </Carousel>
    </div>
  );
};

export default OurServiceSection;