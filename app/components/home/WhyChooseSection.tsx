"use client";

import { BsAward, BsGlobe, BsHouseDoor } from "react-icons/bs";

import Container from "../Container";

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: <BsAward size={40} className="text-gold" />,
      title: "Award Winning",
      description:
        "Our team of experts has been recognized for excellence in real estate services year after year.",
    },
    {
      icon: <BsGlobe size={40} className="text-gold" />,
      title: "Global Network",
      description:
        "Connect with buyers and sellers around the world through our international network.",
    },
    {
      icon: <BsHouseDoor size={40} className="text-gold" />,
      title: "Luxury Properties",
      description:
        "Gain access to exclusive luxury properties that aren't available on the regular market.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-light text-black mb-4">
            Why Choose Kelm Realty
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-md shadow-sm flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {reason.title}
              </h3>
              <p className="text-neutral-600">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div
            className="inline-block bg-tertiary text-white px-8 py-3 rounded-md hover:bg-primary transition cursor-pointer"
            onClick={() => {}}
          >
            Explore Our Services
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhyChooseSection;
