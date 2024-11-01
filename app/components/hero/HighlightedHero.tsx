"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";

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

  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        onChange={(index) => setSelectedSlide(index)}
      >
        {highlighted.map((item) => (
          <div key={item.id} className="relative h-[800px]">
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
      <div className="fixed top-28 left-10 z-10 text-white text-start">
        <h2 className="text-[56px] font-bold">
          {highlighted[selectedSlide].city}
        </h2>
        <p className="text-xl">
          <span>{highlighted[selectedSlide].location}</span>
          <span className="px-2">-</span>
          <span>${highlighted[selectedSlide].price.toLocaleString()}</span>
        </p>
        <Link href={`/listing/${highlighted[selectedSlide].id}`}>
          <span className="mt-4 inline-flex items-center text-white font-semibold text-sm tracking-widest cursor-pointer group border-b-[1px] border-transparent hover:border-gold">
            SEE DETAILS
            <BsArrowRight className="ml-2 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1 group-hover:text-gold" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HighlightedHero;
