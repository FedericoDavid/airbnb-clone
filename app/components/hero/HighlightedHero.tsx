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
              className="brightness-50"
            />
            <div className="absolute top-10 left-10 text-white">
              <h2 className="text-3xl font-bold">{item.city}</h2>
              <p className="text-xl">{item.location}</p>
              <p className="text-lg">${item.price.toLocaleString()}</p>
              <Link href={`/listing/${item.id}`}>
                <span className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                  View More
                </span>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 py-2">
        <Navigation />
      </div>
    </div>
  );
};

export default HighlightedHero;
