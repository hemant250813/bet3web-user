import React from "react";
import { FaUsers } from "react-icons/fa";

const Section2 = () => {
  return (
    <section className="bg-[#E3BC3F] relative flex-grow p-4 h-60 md:p-8 lg:p-12 overflow-hidden">
      <div className="absolute top-1 left-20 bg-[#070B28] w-6/12 h-56 flex items-center justify-center transform skew-x-12 origin-bottom-left">
        {/* Left content */}
      </div>
      <div className="absolute right-20 top-1 bg-[#070B28] w-6/12 h-56 flex items-center justify-center transform right-diagonal origin-bottom-right">
        {/* Right content */}
      </div>
      <div className="absolute top-1 left-24 bg-[#070B28] customized-width h-56 flex items-center justify-center transform origin-bottom-right space-x-4">
        {/* Middle content */}
        <div className="flex justify-center p-2">
          <span className="mr-4 align-middle">
            <FaUsers size={45} className="text-[#E3BC3F]"/>
          </span>
          <span className="text-white">
            <p className="text-sm font-bold">Total User</p>
            <h1 className="text-3xl">1,255,000</h1>
          </span>
        </div>
        <div className="bg-green-500 p-4 rounded-full">Icon 2</div>
        <div className="bg-blue-500 p-4 rounded-full">Icon 1</div>
        <div className="bg-green-500 p-4 rounded-full">Icon 2</div>
      </div>
    </section>
  );
};

export default Section2;
