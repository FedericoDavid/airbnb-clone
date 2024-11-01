"use client";

import { useEffect, useState } from "react";

import Container from "../Container";
import Logo from "./Logo";
import Navigation from "../Navigation";
import UserMenu from "./UserMenu";

import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed w-full z-10 shadow-sm transition-colors duration-300"
      style={{
        backgroundColor: isScrolled ? "#012169" : "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo isScrolled={isScrolled} />
            <div>
              <Navigation />
            </div>
            <UserMenu currentUser={currentUser} isScrolled={isScrolled} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
