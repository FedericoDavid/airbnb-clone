"use client";

import { useState, useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

interface HighlightedHeroProps {
  highlighted: {
    id: number;
    city: string;
    location: string;
    price: number;
    src: string;
  }[];
}

const HighlightedHero: React.FC<HighlightedHeroProps> = ({ highlighted }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    setScrollY(0);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateTextPosition = () => {
    if (!containerRef.current) return "100px";

    const containerHeight = 650;
    const initialTextPosition = 100;
    const bottomMargin = 120;
    const textHeight = 150;

    if (scrollY < 20) return `${initialTextPosition}px`;

    const maxAllowedScroll =
      containerHeight - textHeight - bottomMargin - initialTextPosition;
    const effectiveScroll = Math.min(scrollY, maxAllowedScroll);

    const minPosition = 100;
    const newPosition = Math.max(
      initialTextPosition + effectiveScroll,
      minPosition
    );

    return `${newPosition}px`;
  };

  return (
    <div className="relative h-[650px]" ref={containerRef}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        onChange={(index) => setSelectedSlide(index)}
      >
        {highlighted.map((item) => (
          <div key={item.id} className="relative h-[650px]">
            <Image
              src={item.src}
              alt={`${item.city}, ${item.location}`}
              layout="fill"
              objectFit="cover"
              className="brightness-95"
            />
          </div>
        ))}
      </Carousel>
      <div
        className="absolute left-16 z-20 text-white text-start pointer-events-none transition-all duration-300"
        style={{ top: calculateTextPosition() }}
      >
        <h2 className="text-[56px] font-bold drop-shadow-lg">
          {highlighted[selectedSlide].city}
        </h2>

        <div className="w-36 h-1 bg-gold my-6"></div>

        <p className="text-xl drop-shadow-lg">
          <span>{highlighted[selectedSlide].location}</span>
          <span className="px-2">-</span>
          <span>${highlighted[selectedSlide].price.toLocaleString()}</span>
        </p>
        <Link href={`/listing/${highlighted[selectedSlide].id}`}>
          <span className="mt-6 inline-flex items-center text-white font-semibold text-sm tracking-widest cursor-pointer group border-b-[1px] border-transparent hover:border-gold drop-shadow-lg pointer-events-auto">
            SEE DETAILS
            <BsArrowRight className="ml-2 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1 group-hover:text-gold" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HighlightedHero;
