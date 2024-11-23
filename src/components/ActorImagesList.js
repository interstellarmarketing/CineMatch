import { useState } from 'react';
import { IMG_CDN_ORG_URL, IMG_CDN_URL } from '../utils/constants';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

const ActorImagesList = ({ images }) => {
  const actorImages = images?.profiles;
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group md:px-12 py-3">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-10 w-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        onClick={() => scroll("left")}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Actor Images */}
      <div className="flex overflow-x-scroll scrollbar-hide" ref={scrollRef}>
        <div className="flex scroll-smooth">
          {actorImages.map((image) => (
            <div className="w-60 md:w-64 pr-4" key={image.file_path}>
              <img
                src={IMG_CDN_URL + image.file_path}
                className="md:w-52 md:h-72 rounded-md m-2 object-cover"
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-10 w-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        onClick={() => scroll("right")}
      >
        <FaChevronRight size={20} />
      </button>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <img
            src={IMG_CDN_ORG_URL + selectedImage.file_path}
            className="w-[480px] h-auto rounded-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          />
        </div>
      )}
    </div>
  );
};

export default ActorImagesList;
