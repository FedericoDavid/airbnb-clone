import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  isScrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-center">
      <Image
        onClick={() => router.push("/")}
        alt="main-logo"
        className="cursor-pointer"
        height={46}
        width={46}
        src="/images/main-logo.webp"
        style={{
          boxShadow: isScrolled ? "0 0 0 1px #B8860B" : "",
          borderRadius: isScrolled ? "5%" : "",
        }}
      />
      <div
        className={`hidden md:flex flex-col text-left ${
          isScrolled ? "pl-1.5 text-gold" : "pl-1 text-primary"
        }`}
      >
        <span
          className="text-sm md:text-md uppercase font-bold font-sans mb-0.5"
          style={{ lineHeight: 1 }}
        >
          Grace Kelm
        </span>
        <span
          className="text-sm md:text-[8px] uppercase font-sans tracking-widest"
          style={{ lineHeight: 1 }}
        >
          Martillera publica
        </span>
        <span
          className="text-sm md:text-[8px] uppercase font-sans tracking-widest"
          style={{ lineHeight: 1 }}
        >
          Corretajes - Inmobiliaria
        </span>
      </div>
    </div>
  );
};

export default Logo;
