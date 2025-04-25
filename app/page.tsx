import WhyChooseSection from "./components/home/WhyChooseSection";
import ListingCard from "./components/listings/ListingCard";
import ExpertSection from "./components/home/ExpertSection";
import AboutSection from "./components/home/AboutSection";
import EmptyState from "./components/EmptyState";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";

import HighlightedHero from "./components/hero/HighlightedHero";
import getCurrentUser from "./actions/getCurrentUser";
import { highlighted } from "./constants/highlighted";
import getListings from "./actions/getListings";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <HighlightedHero highlighted={highlighted} />
      <Container>
        <div className="py-8">
          <div className="flex items-center justify-start mb-6">
            <div className="relative">
              <h2 className="text-2xl font-bold text-tertiary">
                Highlighted Listings
              </h2>
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gold rounded-full"></div>
            </div>
          </div>
          <div
            className="           
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            "
          >
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            ))}
          </div>
        </div>
      </Container>
      <div className="flex justify-center my-8">
        <div className="w-72 h-0.5 bg-gold rounded-full"></div>
      </div>
      <AboutSection />
      <ExpertSection />
      <WhyChooseSection />
    </ClientOnly>
  );
}
