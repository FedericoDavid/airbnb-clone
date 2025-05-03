import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // Verificar que se haya seleccionado una ubicación
  if (!location) {
    return NextResponse.json(
      { error: "You must select a location" },
      { status: 400 }
    );
  }

  // Construir el objeto de datos para Prisma, location ahora se guarda en locationValue como JSON string
  const listingData = {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue: JSON.stringify(location), // Convertir a JSON string
    price: parseInt(price, 10),
    userId: currentUser.id,
  };

  const listing = await prisma.listing.create({
    data: listingData,
  });

  return NextResponse.json(listing);
}
