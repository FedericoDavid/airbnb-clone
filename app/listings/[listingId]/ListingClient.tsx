"use client";

import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ListingPrice from "@/app/components/listings/ListingPrice";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";

interface ListingClientProps {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginModal = useLoginModal();

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing]);

  const onContact = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    toast.success("Message sent to the host!");
    setIsLoading(false);
  }, [currentUser, loginModal]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            currentUser={currentUser}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingPrice
                price={listing.price}
                onSubmit={onContact}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
