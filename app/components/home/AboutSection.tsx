"use client";

import Image from "next/image";

import Container from "../Container";

const AboutSection = () => {
  return (
    <div className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-light text-black">
              Kelm Realty, the one for an exceptional home and life.
            </h2>

            <div className="w-24 h-0.5 bg-gold"></div>

            <p className="text-neutral-600 leading-relaxed">
              Built on decades of tradition and dedicated to innovating the
              luxury real estate industry, Kelm Realty offers transformative
              experiences through a global network of exceptional agents.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Our commitment to excellence ensures that each client receives
              personalized attention and unparalleled service in finding or
              selling their dream property.
            </p>
          </div>

          <div className="relative h-[500px] w-full rounded-md overflow-hidden">
            <Image
              src="/images/landing-first.webp"
              alt="Luxury Property"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutSection;
