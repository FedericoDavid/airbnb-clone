"use client";

const Navigation = () => {
  return (
    <div className="w-full md:w-auto py-2 rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">Find a Home</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          My Home value
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block p-2">Rent a Home</div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
