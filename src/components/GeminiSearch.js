import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeminiMovieSuggestions from "./GeminiMovieSuggestions";
import { AI_SEARCH_LOGO, API_OPTIONS, COVER_IMAGE } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchResultMovies } from "../utils/redux/geminiSlice";
import lang from "../utils/languageConstants";

const GeminiSearch = () => {
  const currentLang = useSelector((store) => store.lang.lang);
  const searchText = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const searchTMDMMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGPTSearch = async () => {
    if (!searchText.current || !searchText.current.value) {
      console.error("Search text is undefined or empty");
      return;
    }

    setIsLoading(true); // Start loading animation

    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt =
        "Act as movie recommendation engine and suggest movies based on user's input -" +
        searchText.current.value +
        " give me only 10 movie results as comma separated list of movie titles and also ensure that no extra text is added with it like -'here are...etc'. For example - 'The Dark Knight, Inception, Interstellar'";

      const result = await model.generateContent(prompt);

      const geminiResults = result.response.text().split(",");

      const promiseArray = geminiResults.map((movie) =>
        searchTMDMMovie(movie.trim())
      );

      const movieResults = await Promise.all(promiseArray);

      dispatch(
        addSearchResultMovies({
          movieNames: geminiResults,
          movieResults: movieResults,
        })
      );
    } catch (error) {
      console.error("Error during GPT search:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div>
      <div className="">
        <img
          src={COVER_IMAGE}
          alt="Netflix Logo"
          className="w-full h-screen object-cover fixed"
        />
      </div>
      <div className="">
        <div className="flex justify-center md:pt-6">
          <form
            className="max-md:flex-col absolute z-50 top-[75px] bg-black bg-opacity-65 p-2 md:p-6 flex justify-center items-center w-full md:w-8/12 gap-3 rounded-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <img
                src={AI_SEARCH_LOGO}
                alt="Flimnest Logo"
                className="w-80"
              />
            </div>
              <input
                ref={searchText}
                type="text"
                className="p-1 md:p-2 px-4 w-5/6 rounded-sm outline-none"
                placeholder={lang[currentLang].gptSearchPlaceHolder}
              />
              <button
                className="text-white border border-white w-1/6 p-1 md:p-2 rounded-sm"
                onClick={handleGPTSearch}
              >
                {lang[currentLang].search}
              </button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0 top-44">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div>
          </div>
        ) : (
          <GeminiMovieSuggestions />
        )}
      </div>
    </div>
  );
};

export default GeminiSearch;
