import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Carousel = ({ images = [], title = "Image", showThumbnails = true }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      {/* Main Image Viewer */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-muted">
        {" "}
        {/* Added fixed height */}
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-contain" // Changed object-cover to object-contain
        />
        {/* Prev Button */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
        >
          <HiChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        {/* Next Button */}
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
        >
          <HiChevronRight className="h-6 w-6 text-gray-800" />
        </button>
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 rounded-md bg-white/80 px-3 py-1 text-sm text-gray-800 font-medium">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && (
        <div className="mt-4 flex justify-center space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md transition-all duration-200 ${
                index === currentImageIndex
                  ? "ring-2 ring-blue-500"
                  : "ring-1 ring-gray-200 hover:ring-gray-300"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Carousel;
