import { useSelector } from "react-redux";
import GeminiMovieCard from "./GeminiMovieCard";
import { Link } from "react-router-dom";

const GeminiMovieSuggestions = () => {
  const { searchResultMoviesNames, searchResultMovies } = useSelector((store) => store.gemini);
  console.log(searchResultMovies);

  

  if (!searchResultMoviesNames) return null; 

  return ( 
    <div className="mx-14 my-10">
      <div className='flex items-center justify-center p-2 flex-wrap bg-black bg-opacity-60'>
        {searchResultMovies.map((subArray,index)=>
            subArray.filter( (movie) => 
              (movie.original_language==='en' || movie.original_language ==='hi'|| movie.original_language==='ta'|| movie.original_language==='te')&& movie.title === searchResultMoviesNames[index].trim()
            ).map((movie)=> 
              <Link to={'/movies/'+movie.id} >
                <GeminiMovieCard key={movie.id} movie={movie}/>
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