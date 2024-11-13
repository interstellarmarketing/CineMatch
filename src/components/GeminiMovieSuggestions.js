import { useSelector } from "react-redux";
import ActorMovieCard from "./ActorMovieCard";
import { Link } from "react-router-dom";

const GeminiMovieSuggestions = () => {
  const { searchResultMoviesNames, searchResultMovies } = useSelector((store) => store.gemini);
  console.log(searchResultMovies);

  

  if (!searchResultMoviesNames) return null; 

  return (
    <div className="absolute inset-0 w-full h-full pt-[4%]">
      <h1 className="text-white text-2xl">Movies</h1>
      <div className='flex flex-wrap bg-black'>
        {searchResultMovies.map((subArray,index)=>
            subArray.filter( (movie) => 
              (movie.original_language==='en' || movie.original_language ==='hi'|| movie.original_language==='ta'|| movie.original_language==='te')&& movie.title === searchResultMoviesNames[index].trim()
            ).map((movie)=> 
              <Link to={'/movies/'+movie.id} >
                <ActorMovieCard key={movie.id} movie={movie}/>
              </Link>)
          )}
      </div>
        
      
    </div>
  )

// [
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],

// ]
}

export default GeminiMovieSuggestions