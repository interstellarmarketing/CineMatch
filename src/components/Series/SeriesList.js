import { Link } from "react-router-dom";
import SeriesCard from "./SeriesCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

const SeriesList = ({ title, series }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (!series) return null;

  return (
    <div className="relative group px-5 md:px-12 py-3 text-white">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-10 w-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        onClick={() => scroll("left")}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Series List */}
      <h1 className="text-3xl py-4 font-semibold">{title}</h1>
      <div ref={scrollRef} className="flex overflow-x-scroll scrollbar-hide scroll-smooth">
        <div className="flex">
          {series.map((seriesItem) => (
            <Link to={`/shows/${seriesItem.id}`} key={seriesItem.id}>
              <SeriesCard poster_path={seriesItem.poster_path} />
            </Link>
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
    </div>
  );
};

export default SeriesList;
