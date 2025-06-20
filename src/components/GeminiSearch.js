import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeminiMovieSuggestions from "./GeminiMovieSuggestions";
import { API_OPTIONS } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchResultMovies, clearSearchContext } from "../utils/redux/geminiSlice";
import lang from "../utils/languageConstants";
import frogNetflix from '../assets/images/frog-netflix.png';

const GeminiSearch = () => {
  const currentLang = useSelector((store) => store.lang.lang);
  const { searchResultMovies, searchQuery, isFromGPTSearch } = useSelector((store) => store.gemini);
  const searchText = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Restore search query in input field if coming back from details page
  useEffect(() => {
    if (searchQuery && searchText.current) {
      searchText.current.value = searchQuery;
    }
  }, [searchQuery]);

  // Handle browser back button - preserve search state
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Don't clear search context when user navigates away
      // This allows the back button to work properly
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

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

    // Clear previous search context if this is a new search
    if (isFromGPTSearch && searchText.current.value !== searchQuery) {
      dispatch(clearSearchContext());
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
          searchQuery: searchText.current.value,
        })
      );
    } catch (error) {
      console.error("Error during GPT search:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="relative z-40 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center pt-1 px-4 w-full">
          <figure className="hero-img gpt-search mb-6">
            <img
              src={frogNetflix}
              alt="Frog in a suit watching Netflix"
              loading="lazy"
              className="w-full h-full object-cover block"
            />
          </figure>
          <form
            className="w-full md:w-11/12 lg:w-9/12 p-0 flex flex-col md:flex-row justify-center items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Show previous search results indicator */}
            {isFromGPTSearch && searchResultMovies && searchResultMovies.length > 0 && (
              <div className="w-full mb-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-lg backdrop-blur-sm">
                <p className="text-white text-sm">
                  📋 Previous search: <span className="font-semibold text-blue-300">"{searchQuery}"</span> 
                  ({searchResultMovies.length} results)
                </p>
              </div>
            )}
            
            <div className="w-full flex gap-0">
              <input
                ref={searchText}
                type="text"
                className="p-4 w-full rounded-l-lg outline-none h-14 text-lg bg-gray-800 border border-gray-600 border-r-0 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
                placeholder={lang[currentLang].gptSearchPlaceHolder}
                style={{ minHeight: '56px' }}
              />
              <button
                className="text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 rounded-r-lg whitespace-nowrap h-14 text-lg font-bold flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ minHeight: '56px' }}
                onClick={handleGPTSearch}
              >
                {lang[currentLang].search}
              </button>
            </div>
          </form>
          <div className="w-full md:w-8/12 mt-6 bg-gray-900 bg-opacity-80 p-6 rounded-lg border border-gray-700">
            <p className="text-white mb-4 text-lg font-semibold">💡 Quick Tips</p>
            <ul className="text-gray-300 text-sm md:text-base space-y-3">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Start with "movie(s)" or "TV show(s)"</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Use references — "movies like Brokeback Mountain"</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Optional genre tag — "disaster movies"</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Multiple refs — "movies like [Movie 1] and [Movie 2]"</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative z-30 mt-10 w-full">
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
