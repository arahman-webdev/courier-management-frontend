
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DribbbleIcon, GithubIcon, TwitchIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router";
import logo from '../../assets/images/Logo.png'


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
    <div className=" flex flex-col">
      <div className="grow bg-muted" />
      <footer>
        <div className="container mx-auto">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-x-8 gap-y-10 px-6 xl:px-0">
            <div className="col-span-full xl:col-span-2">
              {/* Logo */}
              <div>
                <h4 className="text-4xl font-bold">ABOUT COMPANY</h4>
                <div className="bg-linear-to-r from-primary w-64 h-[2px]"></div>
              </div>
              <p className="mt-4 text-muted-foreground">
                Quickly supply alternative strategic theme areas vis-a-vis B2C mindshare. Objectively repurpose stand-alone synergy via user-centric architectures.
              </p>
            </div>

            {footerSections.map(({ title, links }) => (
              <div key={title} className="col-span-1">
                <h6 className="font-semibold">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title }) => (
                    <li key={title}>
                      <Link
                        to={'/'}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Subscribe Newsletter */}
            <div className="col-span-2">
              <h6 className="font-semibold">SUBSCRIBE NOW</h6>
              <p>Continually evolve worldwide vortals rather than process centric human capital. Subscribe for our latest news & articles. and send message.</p>
              <form className="mt-6 flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="grow max-w-64"
                />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/" target="_blank">
                Shadcn UI Blocks
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link to="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
