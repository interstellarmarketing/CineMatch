import GeminiMovieSuggestions from "./GeminiMovieSuggestions"
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, COVER_IMAGE } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchResultMovies } from "../utils/redux/geminiSlice";
import lang from "../utils/languageConstants"


const GeminiSearch = () => {
  const currentLang = useSelector(store => store.lang.lang);
  const searchText = useRef(); 
  const dispatch = useDispatch();

  const searchTMDMMovie = async (movie) => {  
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie+ "&include_adult=false&language=en-US&page=1", API_OPTIONS);
  
      const json = await data.json();

      return json.results;
  }

  const handleGPTSearch = async () => {

      if (!searchText.current || !searchText.current.value) {
          console.error("Search text is undefined or empty");
          return;
      }

      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "Act as movie recommendation engine and suggest movies based on user's input -" + searchText.current.value + 
      " give me only 10 movie results as comma separated list of movie titles and also ensure that no extra text is added with it like -'here are...etc'. For example - 'The Dark Knight, Inception, Interstellar'";

      const result = await model.generateContent(prompt);

      // const json = await result.json();
      console.log(result.response.text());

      const geminiResults = result.response.text().split(",");
      console.log(geminiResults);
      
      // console.log(json);

      const promiseArray = geminiResults.map((movie) => searchTMDMMovie(movie));
      //[promise, promise, promise, promise, promise, promise, promise, promise, promise, promise]

      const movieResults = await Promise.all(promiseArray); // resolve all promises in parallel

      dispatch(addSearchResultMovies({movieNames:geminiResults, movieResults:movieResults}));
  }

  return (
    <div>
      <div>
        <div className="">
          <img
              src={COVER_IMAGE}
              alt="Netflix Logo"
              className="w-full h-screen object-cover"
          />
        </div>
        <div className=" flex justify-center pt-6">
          <form className=" absolute top-24 bg-black p-6 flex justify-center items-center w-6/12 gap-3 rounded-md" onSubmit={(e)=>e.preventDefault()}>
              <input
                  ref={searchText} 
                  type="text" 
                  className=" p-2 px-4 w-5/6 rounded-sm outline-none" 
                  placeholder={lang[currentLang].gptSearchPlaceHolder}
              />
              <button className="text-white border border-white w-1/6 p-2 rounded-sm" onClick={handleGPTSearch}>
                  {lang[currentLang].search}
              </button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0">
        <GeminiMovieSuggestions />
      </div>
        
    </div>
  )
}

export default GeminiSearch