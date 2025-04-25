"use client";

import Image from "next/image";

import Container from "../Container";

const ExpertSection = () => {
  return (
    <div className="py-16 bg-tertiary text-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[450px] w-full order-2 md:order-1">
            <Image
              src="/images/landing-second.webp"
              alt="Kelm Realty Office"
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-serif font-light">
              Exclusive Access to Local Experts
            </h2>

            <p className="leading-relaxed text-white/90">
              With experts in every part of the world, we are local everywhere,
              allowing us to walk alongside our clients at every stage of their
              journey.
            </p>

            <p className="leading-relaxed text-white/90">
              With innovative technology and unrivaled service, we ensure that
              your home is connected with buyers, locally and worldwide.
            </p>

            <div className="pt-4">
              <div
                className="inline-block border border-gold text-gold px-8 py-3 uppercase text-sm tracking-wider font-medium hover:bg-gold hover:text-tertiary transition cursor-pointer"
                onClick={() => {}}
              >
                Sell with us &nbsp; &#8594;
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ExpertSection;
