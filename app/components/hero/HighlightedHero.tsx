"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../Navigation";

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
  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
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
            <div className="absolute top-36 left-10 text-[#fff] text-start">
              <h2 className="text-[56px] font-bold">{item.city}</h2>
              <p className="text-xl">
                <span>{item.location}</span>
                <span className="px-2">-</span>
                <span>${item.price.toLocaleString()}</span>
              </p>
              <Link href={`/listing/${item.id}`}>
                <span className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                  View More
                </span>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80">
        <Navigation />
      </div>
    </div>
  );
};

export default HighlightedHero;
