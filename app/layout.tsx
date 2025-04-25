import { Nunito } from "next/font/google";

import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/navbar/Navbar";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./globals.css";

export const metadata = {
  title: "Kelm Realty - Real Estate & Homes for Sale",
  description: "Real Estate and Homes for Sale",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
