"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const locationLabel = useMemo(() => {
    if (!location) return "";

    return `${location.region}, ${location.label}`;
  }, [location]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listings"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full font-bold shadow-md">
            $ {price}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="font-semibold text-white text-lg truncate">
              {data.title}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="bg-blue-100 text-tertiary px-2 py-1 rounded-md text-sm font-medium">
            {locationLabel}
          </div>
          <div className="bg-yellow-100 text-gold px-2 py-1 rounded-md text-sm font-medium">
            {data.category}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
