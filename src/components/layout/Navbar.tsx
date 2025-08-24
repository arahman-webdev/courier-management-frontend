import React, { useEffect, useRef, useState } from "react";
import { Menu, LogOut } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router"; // ✅ use react-router Link
import { useMeQuery } from "@/redux/features/auth.api";
import Logo from "@/assets/icon/Logo";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const StickyNavbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Features", url: "/features" },
    { title: "Faq", url: "/faq" },
    { title: "Contact Us", url: "/contact" },
    { title: "Dashboard", url: "/admin" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
}: Navbar1Props) => {
  const [showSticky, setShowSticky] = useState(false);
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY > 120 && scrollY < lastScroll.current) {
            setShowSticky(true);
          } else if (scrollY <= 120 || scrollY > lastScroll.current) {
            setShowSticky(false);
          }
          lastScroll.current = scrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data } = useMeQuery(undefined);
  const user = data?.data; // ✅ user object from backend

  console.log(user)

  return (
    <>
      {/* Main Navbar */}
      <section className="py-4 px-5 bg-background transition-all duration-300">
        <div className="container mx-auto">
          <NavbarContent logo={logo} menu={menu} auth={auth} user={user} />
        </div>
      </section>

      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-background shadow transition-transform duration-300 ${
          showSticky
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-5 py-2">
          <NavbarContent logo={logo} menu={menu} auth={auth} user={user} />
        </div>
      </div>
    </>
  );
};

function NavbarContent({
  logo,
  menu,
  auth,
  user,
}: {
  logo: Navbar1Props["logo"];
  menu: MenuItem[];
  auth: Navbar1Props["auth"];
  user?: { name: string; image?: string };
}) {
  return (
    <>
      {/* Desktop */}
      <nav className="hidden justify-between lg:flex">
        <div className="flex items-center gap-6">
          <Link to={'/'} className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold tracking-tighter">
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-2 items-center">
          {user ? (
            <div className="flex items-center gap-3">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="font-medium">{user.name}</span>
              <Button size="sm" variant="outline">
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
              <ModeToggle />
            </div>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to={'/login'}>{auth?.login.title}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to={'/register'}>{auth?.signup.title}</Link>
              </Button>
              <ModeToggle />
            </>
          )}
        </div>
      </nav>

      {/* Mobile */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          <Link to={logo?.url} className="flex items-center gap-2">
            <img src={logo?.src} className="max-h-8 dark:invert" alt={logo?.alt} />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link to={logo?.url} className="flex items-center gap-2">
                    <img src={logo?.src} className="max-h-8 dark:invert" alt={logo?.alt} />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 p-4">
                <Accordion type="single" collapsible className="flex flex-col gap-4">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                {user ? (
                  <div className="flex flex-col items-start gap-3">
                    {user.image && (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span className="font-medium">{user.name}</span>
                    <Button variant="outline" className="w-full">
                      <LogOut className="w-4 h-4 mr-1" /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link to={auth?.login.url}>{auth?.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link to={auth?.signup.url}>{auth?.signup.title}</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          to={item.url}
          className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link
    to={item.url}
    className="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
  >
    <div className="text-foreground">{item.icon}</div>
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
      )}
    </div>
  </Link>
);

export { StickyNavbar as Navbar };
