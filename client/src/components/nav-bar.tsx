import React from "react";
import { ThemeToggle } from "./ui/toggel-theme";
import { NavLogo } from "./nav-logo";
import Navlinks from "./nav-links";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-muted bg-background">
      <div className="flex h-16 items-center space-x-4 px-4 sm:container sm:justify-between sm:space-x-0">
        <nav className="flex flex-1 items-center space-x-4">
          <NavLogo href={"/"} />
          <Navlinks />
          <div className="hidden w-full items-stretch justify-end gap-x-2 sm:flex">
            <div>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
