import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PreferencesContext } from '../App';
import { selectAllFavorites, selectAllListedItems } from '../utils/redux/preferencesSlice';
import { IMG_CDN_URL, MOVIE_BANNER } from '../utils/constants';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineBulb } from 'react-icons/ai';
import FavoriteButton from './FavoriteButton';
import { MdMovie, MdLiveTv } from 'react-icons/md';
import MyListCard from './MyListCard';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchResultMovies } from '../utils/redux/geminiSlice';
import { API_OPTIONS } from '../utils/constants';
import GeminiMovieSuggestions from './GeminiMovieSuggestions';

const MyLists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(selectAllFavorites);
    const lists = useSelector((state) => state.preferences.lists);
    const { searchResultMovies } = useSelector((store) => store.gemini);
    const { 
        createNewList, 
        updateListDetails, 
        removeList, 
        addToList, 
        removeFromList,
        isInList 
    } = useContext(PreferencesContext);

    const [isCreatingList, setIsCreatingList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [newListDescription, setNewListDescription] = useState('');
    const [editingList, setEditingList] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const [activeTab, setActiveTab] = useState('watchlist');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [recommendationsLoading, setRecommendationsLoading] = useState({});
    const [showRecommendations, setShowRecommendations] = useState({});

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

    const getRecommendationsForList = async (listId) => {
        if (recommendationsLoading[listId]) return;
        
        const list = lists.find(l => l.id === listId);
        if (!list || list.items.length === 0) {
            alert('This list is empty. Add some items first!');
            return;
        }

        setRecommendationsLoading(prev => ({ ...prev, [listId]: true }));

        try {
            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

            const itemTitles = list.items.map(item => item.title || item.name).join(', ');
            const prompt = `Based on these ${list.items.length} items: ${itemTitles}, recommend 15 movies and TV shows that the user would likely enjoy. Consider their preferences, viewing patterns, and what makes these selections appealing to them. Give me only the titles as a comma-separated list, and ensure no extra text is added.`;

            const result = await model.generateContent(prompt);
            const geminiResults = result.response.text().split(',');

            const promiseArray = geminiResults.map((title) => {
                const trimmedTitle = title.trim();
                return Promise.all([
                    searchTMDMMovie(trimmedTitle),
                    searchTMDBTV(trimmedTitle)
                ]).then(resultsArrays => {
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

            setShowRecommendations(prev => ({ ...prev, [listId]: true }));
        } catch (error) {
            console.error("Error getting recommendations:", error);
            alert('Error getting recommendations. Please try again.');
        } finally {
            setRecommendationsLoading(prev => ({ ...prev, [listId]: false }));
        }
    };

    const handleCreateList = () => {
        if (newListName.trim()) {
            createNewList(newListName.trim(), newListDescription.trim());
            setNewListName('');
            setNewListDescription('');
            setIsCreatingList(false);
        }
    };

    const handleUpdateList = (listId) => {
        if (newListName.trim()) {
            updateListDetails(listId, newListName.trim(), newListDescription.trim());
            setNewListName('');
            setNewListDescription('');
            setEditingList(null);
        }
    };

    const startEditing = (list) => {
        setEditingList(list.id);
        setNewListName(list.name);
        setNewListDescription(list.description);
    };

    const handleAddToList = (listId, itemId) => {
        console.log('handleAddToList called with:', { listId, itemId });
        const numericItemId = parseInt(itemId, 10);
        const item = favorites.find(f => f.id === numericItemId);
        console.log('Found item:', item);
        if (item) {
            const itemWithPoster = {
                ...item,
                poster_path: item.poster_path || null
            };
            console.log('Adding item to list:', itemWithPoster);
            addToList(listId, itemWithPoster);
            setSelectedItems(prev => ({ ...prev, [listId]: '' }));
        }
    };

    const handleMovieClick = (item) => {
        const path = item.media_type === 'movie' ? '/movies' : '/shows';
        navigate(`${path}/${item.id}`);
    };

    const getDisplayItems = () => {
        let items = [];
        if (activeTab === 'myLists') {
            items = lists.flatMap(list => list.items.map(item => ({ ...item, listName: list.name })));
        } else if (activeTab === 'watchlist') {
            const watchlist = lists.find(list => list.name.toLowerCase() === 'watchlist');
            console.log('MyLists - watchlist found:', watchlist);
            console.log('MyLists - all lists:', lists);
            items = watchlist ? watchlist.items : [];
            console.log('MyLists - watchlist items:', items);
        } else if (activeTab === 'likes') {
            items = favorites;
        }
        if (categoryFilter === 'movies') {
            items = items.filter(item => item.media_type === 'movie');
        } else if (categoryFilter === 'tv') {
            items = items.filter(item => item.media_type === 'tv');
        }
        return items;
    };

    return (
        <div className="min-h-screen text-white p-0">
            {/* Tabs Bar */}
            <div className="flex gap-4 mb-8 border-b border-gray-700 mt-10">
                {[
                    { key: 'watchlist', label: 'Watchlist' },
                    { key: 'likes', label: 'Likes' },
                    { key: 'myLists', label: 'My Lists' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 font-semibold focus:outline-none transition-colors border-b-2 ${
                            activeTab === tab.key
                                ? 'border-sky-400 text-sky-400'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Category Filter Bar */}
            <div className="flex gap-3 mb-8">
                {[
                    { key: 'all', label: 'All', icon: null },
                    { key: 'movies', label: 'Movies', icon: <MdMovie className="inline-block mr-1 text-lg" /> },
                    { key: 'tv', label: 'TV', icon: <MdLiveTv className="inline-block mr-1 text-lg" /> }
                ].map(filter => (
                    <button
                        key={filter.key}
                        onClick={() => setCategoryFilter(filter.key)}
                        className={`flex items-center gap-1 px-5 py-2 rounded-full font-medium focus:outline-none transition-all duration-200 shadow-sm border-2 ${
                            categoryFilter === filter.key
                                ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                                : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'
                        }`}
                        style={{ minWidth: 90 }}
                    >
                        {filter.icon}
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Title Count */}
            <div className="mb-6 text-lg font-semibold text-gray-200">
                {getDisplayItems().length} titles
            </div>

            {/* List/Card Grid Section */}
            <div className="grid grid-cols-1 gap-6 w-full">
                {getDisplayItems().map((item) => (
                    <MyListCard key={item.id + (item.listName || '')} item={item} />
                ))}
            </div>

            {/* My Lists Section (only when My Lists tab is active) */}
            {activeTab === 'myLists' && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">My Lists</h2>
                        <button
                            onClick={() => setIsCreatingList(true)}
                            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg transition-colors"
                        >
                            <AiOutlinePlus /> Create New List
                        </button>
                    </div>
                    
                    {/* Create/Edit List Form */}
                    {(isCreatingList || editingList) && (
                        <div className="bg-gray-800 p-6 rounded-lg mb-6">
                            <input
                                type="text"
                                placeholder="List Name"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                className="w-full bg-gray-700 text-white p-3 rounded mb-3"
                            />
                            <textarea
                                placeholder="List Description (optional)"
                                value={newListDescription}
                                onChange={(e) => setNewListDescription(e.target.value)}
                                className="w-full bg-gray-700 text-white p-3 rounded mb-4"
                                rows="3"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => editingList ? handleUpdateList(editingList) : handleCreateList()}
                                    className="bg-sky-500 hover:bg-sky-600 px-4 py-3 rounded font-medium"
                                >
                                    {editingList ? 'Update List' : 'Create List'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsCreatingList(false);
                                        setEditingList(null);
                                        setNewListName('');
                                        setNewListDescription('');
                                    }}
                                    className="bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Lists Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lists.map((list) => (
                            <div key={list.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-1">{list.name}</h3>
                                        {list.description && (
                                            <p className="text-gray-400 text-sm">{list.description}</p>
                                        )}
                                        <p className="text-gray-500 text-sm mt-1">{list.items.length} items</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => startEditing(list)}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            title="Edit list"
                                        >
                                            <AiOutlineEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => removeList(list.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            title="Delete list"
                                        >
                                            <AiOutlineDelete size={18} />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Recommendations Button */}
                                <div className="mb-4">
                                    <button
                                        onClick={() => getRecommendationsForList(list.id)}
                                        disabled={recommendationsLoading[list.id] || list.items.length === 0}
                                        className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-colors ${
                                            recommendationsLoading[list.id]
                                                ? 'bg-gray-600 cursor-not-allowed'
                                                : list.items.length === 0
                                                ? 'bg-gray-600 cursor-not-allowed'
                                                : 'bg-sky-500 hover:bg-sky-600'
                                        }`}
                                    >
                                        <AiOutlineBulb size={16} />
                                        {recommendationsLoading[list.id] 
                                            ? 'Getting Recommendations...' 
                                            : 'Get Recommendations'
                                        }
                                    </button>
                                </div>

                                {/* Recommendations Results */}
                                {showRecommendations[list.id] && searchResultMovies && (
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-lg font-semibold text-sky-400">Recommendations</h4>
                                            <button
                                                onClick={() => setShowRecommendations(prev => ({ ...prev, [list.id]: false }))}
                                                className="text-gray-400 hover:text-white text-sm"
                                            >
                                                Hide
                                            </button>
                                        </div>
                                        <GeminiMovieSuggestions />
                                    </div>
                                )}
                                
                                {/* List Items Grid */}
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    {list.items.slice(0, 6).map((item) => (
                                        <div key={item.id} className="relative group">
                                            <img
                                                src={item.poster_path ? `${IMG_CDN_URL}${item.poster_path}` : MOVIE_BANNER}
                                                alt={item.title || item.name}
                                                className="w-full h-auto rounded cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
                                                onClick={() => handleMovieClick(item)}
                                            />
                                            <button
                                                onClick={() => removeFromList(list.id, item.id)}
                                                className="absolute top-1 right-1 bg-black bg-opacity-50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <AiOutlineDelete className="text-white text-xs" />
                                            </button>
                                        </div>
                                    ))}
                                    {list.items.length > 6 && (
                                        <div className="flex items-center justify-center bg-gray-700 rounded text-gray-400 text-sm">
                                            +{list.items.length - 6} more
                                        </div>
                                    )}
                                </div>
                                
                                {/* Add to List Dropdown */}
                                <select
                                    className="w-full bg-gray-700 text-white p-2 rounded text-sm"
                                    value={selectedItems[list.id] || ''}
                                    onChange={(e) => {
                                        const itemId = e.target.value;
                                        if (itemId) {
                                            handleAddToList(list.id, itemId);
                                        }
                                    }}
                                >
                                    <option value="">Add to this list...</option>
                                    {favorites
                                        .filter(item => !isInList(list.id, item.id))
                                        .map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.title || item.name} ({item.media_type === 'movie' ? 'Movie' : 'TV Show'})
                                            </option>
                                        ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyLists; 