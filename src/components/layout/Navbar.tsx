import React, { useEffect, useRef, useState } from "react";
import { Menu, LogOut } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router";
import { useLogoutMutation, useMeQuery } from "@/redux/features/auth.api";
import Logo from "@/assets/icon/Logo";
import { ProfileOPen } from "./ProfileOpen";
import { logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/features/baseApi";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: { url: string; src: string; alt: string; title: string };
  menu?: MenuItem[];
  auth?: { login: { title: string; url: string }; signup: { title: string; url: string } };
}

export function Navbar({
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
}: NavbarProps) {
  const [showSticky, setShowSticky] = useState(false);
  const lastScroll = useRef(0);

  const { data } = useMeQuery(undefined);
  const [userLogout] = useLogoutMutation();
  const navigate = useNavigate();
  const user = data?.data;
const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await userLogout(undefined).unwrap();

      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      navigate("/login");
    } catch {
      console.error("Logout failed");
    }
  };

  // sticky navbar effect
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 120 && scrollY < lastScroll.current) {
        setShowSticky(true);
      } else if (scrollY <= 120 || scrollY > lastScroll.current) {
        setShowSticky(false);
      }
      lastScroll.current = scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <div className="py-4 px-5 bg-background">
        <div className="container mx-auto">
          <NavbarContent logo={logo} menu={menu} auth={auth} user={user} onLogout={handleLogout} />
        </div>
      </div>

      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-background shadow transition-all duration-300 ${showSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        <div className="container mx-auto px-5 py-2">
          <NavbarContent logo={logo} menu={menu} auth={auth} user={user} onLogout={handleLogout} />
        </div>
      </div>
    </>
  );
}

function NavbarContent({
  logo,
  menu,
  auth,
  user,
  onLogout,
}: {
  logo: NavbarProps["logo"];
  menu: MenuItem[];
  auth: NavbarProps["auth"];
  user?: { name: string; image?: string, role?:string };
  onLogout: () => void;
}) {
  return (
    <>
      {/* Desktop */}
      <nav className="hidden lg:flex justify-between items-center">
        {/* Logo */}
        <Link to={logo?.url ?? "/"} className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold">{logo?.title}</span>
        </Link>

        {/* Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            {menu.map((item) => renderMenuItem(item))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth/User */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {user ? (
            <>
              {user.image && <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />}

              <ProfileOPen
                name={user?.name}
                img={user?.image}
                MyDashboard={user?.role?.toLocaleLowerCase()}
                logout={onLogout}
              />

            </>
          ) : (
            <>

              <Button asChild variant="outline" size="sm">
                <Link to={auth?.login.url ?? '/'}>{auth?.login.title}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to={auth?.signup.url ?? "/"}>{auth?.signup.title}</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile */}
      <div className="flex lg:hidden justify-between items-center">
        <Link to={logo?.url ?? "/"} className="flex items-center gap-2">
          <img src={logo?.src} alt={logo?.alt} className="max-h-8 dark:invert" />
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
                <Link to={logo?.url ?? "/"} className="flex items-center gap-2">
                  <img src={logo?.src} className="max-h-8 dark:invert" alt={logo?.alt} />
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 p-4">
              <Accordion type="single" collapsible className="flex flex-col gap-4">
                {menu.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              {user ? (
                <div className="flex flex-col gap-3">
                  {user.image && <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />}
                  <span className="font-medium">{user.name}</span>
                  <Button variant="outline" className="w-full" onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button asChild variant="outline">
                    <Link to={auth?.login.url ?? "/"}>{auth?.login.title}</Link>
                  </Button>
                  <Button asChild>
                    <Link to={auth?.signup.url ?? "/"}>{auth?.signup.title}</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

/* ----- helpers ----- */

function renderMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((sub) => (
            <NavigationMenuLink asChild key={sub.title} className="w-80">
              <SubMenuLink item={sub} />
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
          className="group inline-flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-muted"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function renderMobileMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {item.items.map((sub) => (
            <SubMenuLink key={sub.title} item={sub} />
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
}

function SubMenuLink({ item }: { item: MenuItem }) {
  return (
    <Link
      to={item.url}
      className="flex gap-3 rounded-md p-3 hover:bg-muted transition"
    >
      {item.icon && <div>{item.icon}</div>}
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
    </Link>
  );
}
