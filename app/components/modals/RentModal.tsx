"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import CategoryInput from "../inputs/CategoryInput";
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
  const [locationError, setLocationError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(STEPS.CATEGORY);

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

  useEffect(() => {
    if (!rentModal.isOpen) {
      clearSavedForm();
      reset();
      setStep(STEPS.CATEGORY);
      setLocationError("");
    }
  }, [rentModal.isOpen, reset]);

  const category = watch("category");
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
    []
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((value) => value - 1);

  const onNext = () => {
    if (step === STEPS.LOCATION && !exactLocation) {
      setLocationError(
        "Please select a location on the map before continuing."
      );
      return;
    }

    setLocationError("");
    setStep((value) => value + 1);
  };

  const mapCoordinates = useMemo(() => {
    if (exactLocation) {
      return [exactLocation.lat, exactLocation.lng];
    }

    return [51.505, -0.09];
  }, [exactLocation]);

  const handleLocationSelect = (selectedLocation: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setCustomValue("exactLocation", selectedLocation);
    setLocationError("");
  };

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

    axios
      .post("/api/listings", {
        ...data,
        location: data.exactLocation
          ? {
              lat: data.exactLocation.lat,
              lng: data.exactLocation.lng,
              address: data.exactLocation.address,
            }
          : null,
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
        <div className="text-sm text-gray-500">
          <p>Select your location on the map:</p>
          <p className="text-xs mt-1">
            The exact location will be shown within a 100-meter radius to
            protect your privacy.
          </p>
        </div>
        <div className="z-0">
          <Map
            center={mapCoordinates}
            onLocationSelect={handleLocationSelect}
            precisionRadius={100}
          />
        </div>
        {exactLocation && (
          <div className="text-sm text-gray-600">
            <p>Selected location:</p>
            <p className="font-medium">{exactLocation.address}</p>
          </div>
        )}
        {locationError && (
          <div className="text-sm text-rose-500 font-medium">
            {locationError}
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
    clearSavedForm();
    rentModal.onClose();
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
