import React from "react";
import { ArrowRight } from "lucide-react";


// ServiceCard component
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  bgImage,
}) => {





  return (
    <div className="">

      <div className="relative group  overflow-hidden shadow-md transition-all duration-500 bg-white border-b-4 border-primary">
        {/* Background Image (hover effect) */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-[#102242]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col">
          {/* Top Icon */}
          <div className="flex items-center justify-between">
            <div className="text-primary group-hover:text-white transition-colors duration-500">
              {icon}
            </div>
            <div className="absolute top-1 right-1 text-primary/10 group-hover:hidden">
              {React.isValidElement(icon) &&
                React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
                  size: 120,
                })}
            </div>
          </div>

          <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 py-4">
            {title}
          </h3>

          <p className="mt-3 text-gray-600 group-hover:text-gray-200 text-sm leading-relaxed transition-colors duration-500">
            {description}
          </p>

          <div className="mt-4 border-t border-gray-200 group-hover:border-gray-400" />

          <div className="mt-4 flex items-center justify-between gap-2 font-semibold text-primary group-hover:text-white transition-colors duration-500">
            <span>READ MORE</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard