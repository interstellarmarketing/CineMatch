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
    // Tag results as movies
    return (json.results || []).map(r => ({ ...r, media_type: 'movie' }));
  };

  const searchTMDBTV = async (show) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/tv?query=" +
        show +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // Tag results as tv
    return (json.results || []).map(r => ({ ...r, media_type: 'tv' }));
  };

  const handleGPTSearch = async () => {
    if (!searchText.current || !searchText.current.value) {
      console.error("Search text is undefined or empty");
      return;
    }

    setIsLoading(true); // Start loading animation

    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

      // Dynamic prompt construction based on user input
      const userInput = searchText.current.value.toLowerCase();
      let typePhrase = "movies and TV shows";
      if (userInput.includes("movie") && !userInput.includes("tv show") && !userInput.includes("series")) {
        typePhrase = "movies";
      } else if ((userInput.includes("tv show") || userInput.includes("series")) && !userInput.includes("movie")) {
        typePhrase = "TV shows";
      }
      const prompt =
        `Act as a recommendation engine and suggest up to 20 relevant ${typePhrase} based on the user's input: ${searchText.current.value}. Give me only the titles as a comma-separated list, and ensure no extra text is added.`;

      const result = await model.generateContent(prompt);

      // Log the raw Gemini response and parsed results for development
      console.log('Raw Gemini response:', result.response.text());

      const geminiResults = result.response.text().split(",");
      console.log('Parsed Gemini results:', geminiResults);

      // Determine what to search for based on typePhrase
      const shouldSearchMovies = typePhrase.includes('movie');
      const shouldSearchTV = typePhrase.toLowerCase().includes('tv show');

      const promiseArray = geminiResults.map((title) => {
        const trimmedTitle = title.trim();
        let searches = [];
        if (shouldSearchMovies) searches.push(searchTMDMMovie(trimmedTitle));
        if (shouldSearchTV) searches.push(searchTMDBTV(trimmedTitle));
        if (searches.length === 0) searches = [searchTMDMMovie(trimmedTitle), searchTMDBTV(trimmedTitle)]; // fallback to both
        return Promise.all(searches).then(resultsArrays => {
          const allResults = resultsArrays.flat();
          // Filter for exact title matches (case-insensitive)
          const exactMatches = allResults.filter(
            (item) =>
              item &&
              item.id &&
              ((item.media_type === 'movie' && item.title && item.title.trim().toLowerCase() === trimmedTitle.toLowerCase()) ||
               (item.media_type === 'tv' && item.name && item.name.trim().toLowerCase() === trimmedTitle.toLowerCase()))
          );
          if (exactMatches.length === 0) return null;
          // Sort by popularity and take the most popular
          return exactMatches.sort((a, b) => b.popularity - a.popularity)[0];
        });
      });

      const movieResults = await Promise.all(promiseArray);

      // Filter out nulls and deduplicate by 'id'
      const filteredResults = movieResults.filter(movie => movie && movie.id);
      const uniqueResultsMap = new Map();
      filteredResults.forEach(movie => {
        if (!uniqueResultsMap.has(movie.id)) {
          uniqueResultsMap.set(movie.id, movie);
        }
      });
      const uniqueResults = Array.from(uniqueResultsMap.values());

      dispatch(
        addSearchResultMovies({
          movieNames: geminiResults,
          movieResults: uniqueResults,
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
            className="max-md:flex-col absolute z-40 top-[75px] bg-black bg-opacity-65 p-2 md:p-6 flex justify-center items-center w-full md:w-8/12 gap-3 rounded-md"
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
                className="p-3 md:p-2 px-4 w-full md:w-5/6 rounded-sm outline-none"
                placeholder={lang[currentLang].gptSearchPlaceHolder}
              />
              <button
                className="text-black bg-sky-400 md:w-1/6 w-3/6 p-1 md:p-2 rounded-sm"
                onClick={handleGPTSearch}
              >
                {lang[currentLang].search}
              </button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0 top-72 md:top-44">
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
