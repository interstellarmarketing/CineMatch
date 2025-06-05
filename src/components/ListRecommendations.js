import { useState } from 'react';
import { useDispatch } from 'react-redux';
import usePreferences from '../hooks/usePreferences';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchResultMovies } from '../utils/redux/geminiSlice';
import { API_OPTIONS } from '../utils/constants';
import GeminiMovieSuggestions from './GeminiMovieSuggestions';

const ListRecommendations = () => {
    const { favorites, lists } = usePreferences();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedList, setSelectedList] = useState('all');
    const [recommendationType, setRecommendationType] = useState('movies'); // 'movies', 'shows', or 'both'

    const searchTMDMMovie = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();
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
        return (json.results || []).map(r => ({ ...r, media_type: 'tv' }));
    };

    const getRecommendations = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            // Get the items to use as basis for recommendations
            const items = selectedList === 'all' 
                ? favorites 
                : lists.find(list => list.id === selectedList)?.items || [];

            if (items.length === 0) {
                alert('Please add some favorites or create a list first!');
                setIsLoading(false);
                return;
            }

            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

            // Construct the prompt based on the items and recommendation type
            const itemTitles = items.map(item => item.title).join(', ');
            const typePhrase = recommendationType === 'both' 
                ? 'movies and TV shows' 
                : recommendationType === 'movies' 
                    ? 'movies' 
                    : 'TV shows';

            const prompt = `Based on these ${items.length} ${typePhrase}: ${itemTitles}, recommend 20 ${typePhrase} that the user would likely enjoy. Consider their preferences, viewing patterns, and what makes these selections appealing to them. Give me only the titles as a comma-separated list, and ensure no extra text is added.`;

            const result = await model.generateContent(prompt);
            const geminiResults = result.response.text().split(',');

            // Determine what to search for based on recommendationType
            const shouldSearchMovies = recommendationType !== 'shows';
            const shouldSearchTV = recommendationType !== 'movies';

            const promiseArray = geminiResults.map((title) => {
                const trimmedTitle = title.trim();
                let searches = [];
                if (shouldSearchMovies) searches.push(searchTMDMMovie(trimmedTitle));
                if (shouldSearchTV) searches.push(searchTMDBTV(trimmedTitle));
                return Promise.all(searches).then(resultsArrays => {
                    const allResults = resultsArrays.flat();
                    const exactMatches = allResults.filter(
                        (item) =>
                            item &&
                            item.id &&
                            ((item.media_type === 'movie' && item.title && item.title.trim().toLowerCase() === trimmedTitle.toLowerCase()) ||
                             (item.media_type === 'tv' && item.name && item.name.trim().toLowerCase() === trimmedTitle.toLowerCase()))
                    );
                    if (exactMatches.length === 0) return null;
                    return exactMatches.sort((a, b) => b.popularity - a.popularity)[0];
                });
            });

            const movieResults = await Promise.all(promiseArray);
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
            console.error("Error getting recommendations:", error);
            alert('Error getting recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Get Recommendations</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Recommendation Type</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setRecommendationType('movies')}
                                className={`px-4 py-2 rounded ${
                                    recommendationType === 'movies'
                                        ? 'bg-sky-500 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                }`}
                            >
                                Movies Only
                            </button>
                            <button
                                onClick={() => setRecommendationType('shows')}
                                className={`px-4 py-2 rounded ${
                                    recommendationType === 'shows'
                                        ? 'bg-sky-500 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                }`}
                            >
                                TV Shows Only
                            </button>
                            <button
                                onClick={() => setRecommendationType('both')}
                                className={`px-4 py-2 rounded ${
                                    recommendationType === 'both'
                                        ? 'bg-sky-500 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                }`}
                            >
                                Both
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Base Recommendations On</label>
                        <select
                            value={selectedList}
                            onChange={(e) => setSelectedList(e.target.value)}
                            className="w-full bg-gray-700 text-white p-2 rounded"
                        >
                            <option value="all">All Favorites</option>
                            {lists.map(list => (
                                <option key={list.id} value={list.id}>
                                    {list.name} ({list.items.length} items)
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={getRecommendations}
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg font-semibold ${
                            isLoading
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-sky-500 hover:bg-sky-600'
                        }`}
                    >
                        {isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <GeminiMovieSuggestions />
                )}
            </div>
        </div>
    );
};

export default ListRecommendations; 