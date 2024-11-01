import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import HighlightedHero from "./components/hero/HighlightedHero";
import { highlighted } from "./constants/highlighted";

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
          <div className="flex items-center justify-start mb-4">
            <h2 className="text-2xl font-bold text-black">
              Our Current Listings
            </h2>
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
    </ClientOnly>
  );
}
