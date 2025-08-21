import { Clock, MapPin, Package, Plane, Truck } from "lucide-react";
import SectionTitle from "./SectionTile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ServiceCard from "./ServiceCard";

const OurServiceSection = () => {
  const services = [
    {
      title: "Fast Air Delivery",
      description: "Swift international shipping through reliable air freight.",
      icon: <Plane size={32} />,
      bgImage:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Secure Parcel Handling",
      description: "Every parcel is packaged and handled with maximum care.",
      icon: <Package size={32} />,
      bgImage:
        "https://images.unsplash.com/photo-1609335809156-6e9ffbd522f6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Nationwide Trucking",
      description:
        "Reliable truck transport across all major cities and districts.",
      icon: <Truck size={32} />,
      bgImage:
        "https://images.unsplash.com/photo-1569163139599-0f44bd22f394?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Door-to-Door Service",
      description: "We pick up and deliver directly to your customer’s doorstep.",
      icon: <MapPin size={32} />,
      bgImage:
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your parcels live with our modern tracking system.",
      icon: <Clock size={32} />,
      bgImage:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07c?auto=format&fit=crop&w=1200&q=80",
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

      {/* Carousel with infinite loop */}
      <Carousel
        opts={{
          align: "start",
          loop: true, // 🔥 Infinite loop
        }}
        className="w-full max-w-6xl mx-auto"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default OurServiceSection;