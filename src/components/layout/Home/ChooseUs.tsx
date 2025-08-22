import { Truck } from "lucide-react";
import bg2 from "../../../assets/images/bg2.png";
import deliveryMan from "../../../assets/images/delivery-man.png";

const ChooseUs = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg2})` }}
      />
      <div className="absolute inset-0 bg-[#070f1d]/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Section header */}
        <div className="text-center mb-12">
          <h4 className="text-white text-sm font-semibold tracking-widest mb-3 rounded-[20px] border-b-2 border-primary inline-block px-6 py-2">
            WHY CHOOSE US
          </h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            WHY CHOOSE FOR US
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base">
            Dramatically enhance interactive metrics for reliable services.
            Proactively unleash fully researched e-commerce.
          </p>
        </div>

        {/* Features + Image */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          {/* Left Features */}
          <div className="space-y-6 w-full lg:w-1/3">
            <div className="flex gap-4">
              <Truck
                className="bg-primary text-white p-4 rounded-full shrink-0"
                size={60}
              />
              <div className="space-y-2">
                <h6 className="text-lg font-semibold text-white">
                  FAST TRANSPORTATION SERVICE
                </h6>
                <p className="text-gray-200 text-sm sm:text-base">
                  Enhance interactive metrics for reliable services. Proactively
                  unleash fully researched.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Truck
                className="bg-primary text-white p-4 rounded-full shrink-0"
                size={60}
              />
              <div className="space-y-2">
                <h6 className="text-lg font-semibold text-white">
                  SECURE PACKAGING
                </h6>
                <p className="text-gray-200 text-sm sm:text-base">
                  Ensure safe handling of your parcels with top-tier packaging.
                </p>
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <img
              src={deliveryMan}
              alt="Delivery Man"
              className="max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-full h-auto"
            />
          </div>

          {/* Right Features */}
          <div className="space-y-6 w-full lg:w-1/3">
            <div className="flex gap-4">
              <Truck
                className="bg-primary text-white p-4 rounded-full shrink-0"
                size={60}
              />
              <div className="space-y-2">
                <h6 className="text-lg font-semibold text-white">
                  REAL-TIME TRACKING
                </h6>
                <p className="text-gray-200 text-sm sm:text-base">
                  Stay updated with live parcel tracking at every stage.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Truck
                className="bg-primary text-white p-4 rounded-full shrink-0"
                size={60}
              />
              <div className="space-y-2">
                <h6 className="text-lg font-semibold text-white">
                  CUSTOMER SUPPORT
                </h6>
                <p className="text-gray-200 text-sm sm:text-base">
                  Our 24/7 support ensures smooth and reliable communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
