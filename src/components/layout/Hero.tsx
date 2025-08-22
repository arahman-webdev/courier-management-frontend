
import heroImg from "../../assets/images/hero.png"


const Hero = () => {
  return (
    <section
      className="relative flex items-center min-h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#00040a] to-[#070f1d]/50 z-0" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-7/12 w-full">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                FAST CERTIFIED &amp;<br />
                BEST WORLD WIDE SERVICE
              </h1>
              <p className="text-lg mb-8">
                Professionally strategize stand-alone functionalities and cooperative total linkage. Objectively predominate virtual quality vectors with orthogonal.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  className="px-8 py-3 bg-[#F5B942] text-white rounded transition hover:bg-[#d89a11] font-semibold shadow-lg"
                  href="service.html"
                >
                  Explore The Services
                </a>
                <a
                  className="px-8 py-3 bg-white text-[#F5B942] rounded transition hover:bg-gray-100 font-semibold border border-[#F5B942] shadow-lg"
                  href="contact.html"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          {/* You can add an empty div here to mimic col-md-5 if you want spacing on the right */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
