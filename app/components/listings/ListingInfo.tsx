"use client";

import dynamic from "next/dynamic";

import ListingCategory from "./ListingCategory";
import Avatar from "../Avatar";

import useCountries from "@/app/hooks/useCountries";
import { Category } from "../navbar/Categories";
import { SafeUser } from "@/app/types";

const ViewOnlyMap = dynamic(() => import("../ViewOnlyMap"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  category: Category | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  const coordinates = location?.latlng;
  const hasExactLocation = "exactAddress" in (location || {});

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-black text-xl font-semibold flex flex-row items-center gap-2">
          <span>Hosted by {user?.name}</span>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-600">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-600">{description}</div>
      <hr />
      <div className="text-lg font-semibold text-black">Location</div>
      <div className="font-light text-neutral-600">
        {location?.region}, {location?.label}
        {hasExactLocation && (
          <div className="mt-2 text-sm">
            <span className="text-neutral-600">Approximate location: </span>
            {(location as any).exactAddress}
          </div>
        )}
      </div>
      <ViewOnlyMap center={coordinates} precisionRadius={100} />
    </div>
  );
};

export default ListingInfo;
