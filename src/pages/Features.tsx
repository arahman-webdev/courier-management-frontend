

const features = [
  {
    icon: (
      // Fast Delivery SVG
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M3 12l18-6-4 6 4 6-18-6z" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
    title: "Fast & Reliable Delivery",
    desc: "Experience lightning-fast courier services with real-time tracking and guaranteed delivery times, ensuring your package reaches its destination safely and on schedule."
  },
  {
    icon: (
      // Wide Network SVG
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Extensive Coverage",
    desc: "Our vast delivery network covers every district and city, from the busiest metro to remote regions—just like Pathao or Sundarban Courier."
  },
  {
    icon: (
      // Technology SVG
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M8 21h8" />
      </svg>
    ),
    title: "Smart Technology",
    desc: "Track your shipments, schedule pickups, and manage orders online with our easy-to-use app and web portal."
  },
  {
    icon: (
      // Support SVG
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
      </svg>
    ),
    title: "24/7 Customer Support",
    desc: "Our dedicated team is always available to assist you, ensuring a smooth delivery experience every time."
  }
];

export default function CourierFeatures() {
  return (
    <section className=" py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold  mb-4">
          Why Choose Our Courier Service?
        </h2>
        <p className="text-lg text-[#43506e]">
          Secure, fast, and dependable delivery—trusted by thousands, inspired by the efficiency of Pathao and Sundarban Courier.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border"
          >
            <div className="bg-primary rounded-full p-4 mb-5 shadow-lg">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold  mb-2">{feature.title}</h3>
            <p className="text-[#43506e] text-base">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}