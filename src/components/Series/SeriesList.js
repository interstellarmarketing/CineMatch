import { Link } from "react-router-dom";
import SeriesCard from "./SeriesCard";

const SeriesList = ({title,series}) => {

    if(!series) return;

  return (
    <div className="px-5 md:px-12 py-3 text-white">
        <h1 className="text-3xl py-4 font-semibold">
            {title}
        </h1>
        <div className="flex overflow-x-scroll scrollbar-hide ">
            <div className="flex scroll-smooth">
                {series.map(movie => (
                    <Link to={'/shows/'+movie.id} >
                        <SeriesCard key={movie.id} poster_path={movie.poster_path}/>
                    </Link>
                ))} 
            </div>
        </div>
        
    </div>
  )
}

export default SeriesList;