import { useSelector } from "react-redux";
import CastCard from "./CastCard";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

const CastList = () => {
  const cast = useSelector((store) => store.details.castDetails);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-10 w-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        onClick={() => scroll("left")}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Cast List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide scroll-smooth"
      >
        <div className="flex">
          {cast &&
            cast.map((actor) => (
              <Link to={`/cast/${actor.id}`} key={actor.id}>
                <CastCard
                  actorName={actor.name}
                  actorCharacter={actor.character.split(" / ")[0]}
                  actorProfilePath={actor.profile_path}
                />
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

export default CastList;
