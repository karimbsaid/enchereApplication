import { Link, NavLink } from "react-router-dom";
import {
  HiBell,
  HiShoppingBag,
  HiMiniUser,
  HiHeart,
  HiArrowRightOnRectangle,
  HiMagnifyingGlass,
} from "react-icons/hi2";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import Button from "./Button";
import DropDown from "./DropDown";
import Input from "./Input";
import { useAuth } from "../context/authContext";

export default function NavBar({ notificationCount }) {
  const navLinks = [
    { href: "/", label: "Home" },
    // { href: "/auctions", label: "Auctions" },
    // { href: "/categories", label: "Categories" },
    // { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
  ];
  const { logout, user } = useAuth();
  const isLoggedIn = user ? true : false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow  shadow-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link to="/" className="mr-4 flex items-center space-x-2">
          <HiShoppingBag className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">AuctionHub</span>
        </Link>

        <nav className="hidden md:flex md:flex-1 md:items-center md:gap-6 md:text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost">
                <Link to="/notifications" className="relative">
                  <HiBell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-4 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {notificationCount}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Link>
              </Button>

              <DropDown>
                <DropDown.Trigger>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://placehold.co/600x400/000000/FFF"
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropDown.Trigger>
                <DropDown.Window className="w-56">
                  <DropDown.Item>
                    <Link to="/dashboard" className="flex items-center">
                      <HiMiniUser className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropDown.Item>
                  {/* <DropdownMenuSeparator /> */}
                  <DropDown.Item>
                    <div onClick={logout} className="flex items-center">
                      <HiArrowRightOnRectangle className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </DropDown.Item>
                </DropDown.Window>
              </DropDown>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
