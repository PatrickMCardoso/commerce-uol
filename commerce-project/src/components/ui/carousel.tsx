import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface CarouselProps {
  children: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      <div className="w-full flex justify-center items-center text-center">
        <div className={`w-3/4 max-w-md mb-2 ${currentIndex === 1 ? 'max-w-sm' : ''}`}>
          {children[currentIndex]}
        </div>
      </div>

      <div className="absolute w-full flex justify-between top-1/2 transform -translate-y-1/2 px-4">
        <button
          onClick={prevSlide}
          className="bg-white p-2 rounded-full shadow-md text-lg"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white p-2 rounded-full shadow-md text-lg"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};