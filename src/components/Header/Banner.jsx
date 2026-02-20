import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-40 mt-2 rounded-xl overflow-hidden">
      <img
        src="/assets/Main_image.png"
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 h-full flex flex-col justify-center px-4 text-white">
        <h2 className="text-lg font-bold">“Hungry? Just Tap!”</h2>

        <button className="bg-white text-red-500 px-3 py-1 mt-2 rounded-sm text-sm font-bold max-w-fit">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
