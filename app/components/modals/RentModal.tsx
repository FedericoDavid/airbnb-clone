"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import Modal from "./Modal";

import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const rentModal = useRentModal();
  const router = useRouter();

  const formStorageKey = "rentModalFormData";

  const getSavedFormData = () => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(formStorageKey);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  };

  const getDefaultValues = () => {
    const savedData = getSavedFormData();

    return (
      savedData || {
        category: "",
        location: null,
        exactLocation: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: "",
        price: 1,
        title: "",
        description: "",
      }
    );
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: getDefaultValues(),
  });

  const formValues = watch();
  useEffect(() => {
    if (typeof window !== "undefined" && rentModal.isOpen) {
      sessionStorage.setItem(formStorageKey, JSON.stringify(formValues));
    }
  }, [formValues, rentModal.isOpen]);

  const clearSavedForm = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(formStorageKey);
    }
  };

  const category = watch("category");
  const location = watch("location");
  const exactLocation = watch("exactLocation");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const handleCountryChange = (countryValue: any) => {
    const currentExact = watch("exactLocation");

    setCustomValue("location", countryValue);

    if (currentExact) {
      setTimeout(() => {
        setCustomValue("exactLocation", currentExact);
      }, 0);
    }
  };

  const mapCoordinates = useMemo(() => {
    if (exactLocation) {
      return [exactLocation.lat, exactLocation.lng];
    }

    return location?.latlng;
  }, [exactLocation, location]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);

    const locationData = {
      ...data.location,
      exactLocation: data.exactLocation
        ? {
            lat: data.exactLocation.lat,
            lng: data.exactLocation.lng,
            address: data.exactLocation.address,
          }
        : null,
    };

    axios
      .post("/api/listings", {
        ...data,
        location: locationData,
      })
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        clearSavedForm();
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLocationSelect = (selectedLocation: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setCustomValue("exactLocation", selectedLocation);
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect value={location} onChange={handleCountryChange} />
        <div className="text-sm text-gray-500">
          <p>Select a more precise location on the map:</p>
          <p className="text-xs mt-1">
            The exact location will be shown within a 100-meter radius to
            protect your privacy.
          </p>
        </div>
        <Map
          center={mapCoordinates}
          onLocationSelect={handleLocationSelect}
          precisionRadius={100}
        />
        {exactLocation && (
          <div className="text-sm text-gray-600">
            <p>Selected location:</p>
            <p className="font-medium">{exactLocation.address}</p>
          </div>
        )}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  const handleClose = () => {
    if (
      confirm(
        "Are you sure you want to close? Your data will be saved for later."
      )
    ) {
      rentModal.onClose();
    }
  };

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
