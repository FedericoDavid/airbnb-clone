"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Navigation from "../Navigation";
import Container from "../Container";
import UserMenu from "./UserMenu";
import Logo from "./Logo";

import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed w-full z-50 shadow-sm transition-colors duration-300"
      style={{
        backgroundColor: !isHomePage
          ? "#012169"
          : isScrolled
          ? "#012169"
          : "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo isScrolled={isScrolled || !isHomePage} />
            <div>
              <Navigation />
            </div>
            <UserMenu
              currentUser={currentUser}
              isScrolled={isScrolled || !isHomePage}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
