"use client";

import { usePathname } from "next/navigation";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div
      className={`
        ${isHomePage ? "" : "pt-24"} 
        transition-all
        duration-300
      `}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
