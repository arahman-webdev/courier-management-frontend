
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, DribbbleIcon, Facebook, GithubIcon, LinkedinIcon, TwitchIcon, Twitter, TwitterIcon, Youtube } from "lucide-react";
import { Link } from "react-router";
import ContactInfoBar from "../SharedComponents/ContactInfoBar";


const footerSections = [
  {
    title: "USEFULL LINKS",
    links: [
      {
        title: "Overview",
        href: "#",
      },
      {
        title: "Features",
        href: "#",
      },
      {
        title: "Solutions",
        href: "#",
      },
      {
        title: "Tutorials",
        href: "#",
      },
      {
        title: "Pricing",
        href: "#",
      },
      {
        title: "Releases",
        href: "#",
      },
    ],
  },
  {
    title: "OUR SERVICES",
    links: [
      {
        title: "Blog",
        href: "#",
      },
      {
        title: "Newsletter",
        href: "#",
      },
      {
        title: "Events",
        href: "#",
      },
      {
        title: "Help centre",
        href: "#",
      },
      {
        title: "Tutorials",
        href: "#",
      },
      {
        title: "Support",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
 <div className="flex flex-col">
      <ContactInfoBar />
      <footer>
        <div className="container mx-auto">
          {/* Top grid */}
          <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 px-6 xl:px-0">
            
            {/* Company info */}
            <div className="col-span-full lg:col-span-2">
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold">ABOUT COMPANY</h4>
              <div className="bg-linear-to-r from-primary w-32 md:w-64 h-[2px]"></div>
              <p className="mt-4 text-muted-foreground text-sm md:text-base">
                Quickly supply alternative strategic theme areas vis-a-vis B2C mindshare. Objectively repurpose stand-alone synergy via user-centric architectures.
              </p>

              {/* Social icons */}
              <div className="pt-10 md:pt-20 flex gap-3 md:gap-4 flex-wrap">
                {[Facebook, Twitter, LinkedinIcon, Youtube].map((Icon, i) => (
                  <Icon
                    key={i}
                    className="bg-primary text-white p-2 rounded-full shrink-0 hover:bg-transparent hover:border border-gray-300 hover:text-primary transition-all ease-in-out"
                    size={40}
                  />
                ))}
              </div>
            </div>

            {/* Dynamic links */}
            {footerSections.map(({ title, links }) => (
              <div key={title} className="col-span-1">
                <h6 className="font-semibold">{title}</h6>
                <div className="bg-linear-to-r from-primary  w-32 h-[2px]"></div>
                <ul className="mt-6 space-y-3 text-sm md:text-base">
                  {links.map(({ title }) => (
                    <li key={title} className="group transition">
                      <Link
                        to="/"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 group-hover:translate-x-2 duration-300 ease-in-out"
                      >
                        <ArrowRight size={14} className="group-hover:text-primary" />
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="col-span-full sm:col-span-2">
              <h6 className="font-semibold">SUBSCRIBE NOW</h6>
                <div className="bg-linear-to-r from-primary w-32 h-[2px]"></div>
              <p className="text-sm md:text-base">
                Subscribe for our latest news & articles. Stay updated with parcel tracking & delivery updates.
              </p>
              <form className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button className="w-full sm:w-auto">Subscribe</Button>
              </form>
            </div>
          </div>

          <Separator />

          {/* Bottom bar */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 xl:px-0">
            <span className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/" className="hover:underline">
                SwiftParcel
              </Link>
              . All rights reserved.
            </span>
            <div className="flex items-center gap-4 text-muted-foreground">
              {[TwitterIcon, DribbbleIcon, TwitchIcon, GithubIcon].map((Icon, i) => (
                <Link key={i} to="#" target="_blank">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
