

const infoItems = [
  {
    icon: (
      // Location pin SVG
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <circle cx="12" cy="10" r="3.5" />
        <path d="M12 21s7-7.5 7-12A7 7 0 0 0 5 9c0 4.5 7 12 7 12z" />
      </svg>
    ),
    title: "OFFICE ADDRESS:",
    lines: [
      "2245 Gilbert Ave, Cincinnati,",
      "OH 45206, United States"
    ]
  },
  {
    icon: (
      // Phone SVG
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    ),
    title: "CONTACT US:",
    lines: [
      "info.logic@transpro.com",
      "+1 800-226-4054"
    ]
  },
  {
    icon: (
      // Clock SVG
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v5l3 2" />
      </svg>
    ),
    title: "WORKING HOURS:",
    lines: [
      "Weekdays - Mon-Fri: 8am-21pm",
      "Weekend - Sta & Sun: Closed"
    ]
  }
];



function ContactInfoBar() {
  return (
    <div className="bg-[#15182C] py-8 px-6 flex flex-col md:flex-row justify-center items-start gap-10 md:gap-20 w-full overflow-x-auto">
      {infoItems.map((item, idx) => (
        <div key={idx} className="flex items-start gap-4 relative">
          {/* Icon */}
          <div className="relative shrink-0">
            <div className="absolute top-2 left-2 w-12 h-12 md:w-16 md:h-16 bg-[#24273E] rounded-[10px] z-0" />
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FF4C1D] rounded-[10px] flex items-center justify-center relative z-10">
              {item.icon}
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="text-white font-bold text-base md:text-lg mb-1">{item.title}</div>
            {item.lines.map((line, i) => (
              <div key={i} className="text-[#CCD3E1] text-sm md:text-base leading-tight">{line}</div>
            ))}
          </div>

          {/* Arrow connector (only desktop) */}
          {idx < infoItems.length - 1 && (
            <svg
              className="absolute right-[-30px] top-1/2 -translate-y-1/2 hidden xl:block"
              width="40"
              height="100"
              viewBox="0 0 60 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0L60 65L0 130" stroke="#23263B" strokeWidth="2" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default ContactInfoBar