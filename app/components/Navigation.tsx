"use client";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className={`w-full md:w-auto py-2 font-semibold text-white`}>
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm hidden sm:block hover:text-gold">
          <p className="hover:text-gold cursor-pointer">Find a Home</p>
        </div>
        <div className="hidden sm:block text-sm px-6 border-x-[1px] border-gold flex-1 text-center">
          <p className="hover:text-gold cursor-pointer">My Home value</p>
        </div>
        <div className="text-sm pl-6 pr-2 flex flex-row items-center gap-3">
          <div className="hidden sm:block p-2">
            <p className="hover:text-gold cursor-pointer">Rent a Home</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
