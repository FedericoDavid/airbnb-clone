"use client";

import Button from "../Button";

interface ListingPriceProps {
  price: number;
  onSubmit: () => void;
  disabled?: boolean;
}

const ListingPrice: React.FC<ListingPriceProps> = ({
  price,
  onSubmit,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row items-center gap-1">
          <div className="text-3xl font-bold text-black">$ {price}</div>
          <div className="font-medium text-black">per night</div>
        </div>
        <p className="text-sm text-neutral-600">
          Contact the host for availability and booking details
        </p>
      </div>
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Contact Host" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ListingPrice;
