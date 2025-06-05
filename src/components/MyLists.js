import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePreferences from '../hooks/usePreferences';
import { IMG_CDN_URL, MOVIE_BANNER } from '../utils/constants';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineBulb } from 'react-icons/ai';
import FavoriteButton from './FavoriteButton';

const MyLists = () => {
    const navigate = useNavigate();
    const { 
        favorites, 
        lists, 
        createNewList, 
        updateListDetails, 
        removeList, 
        addToList, 
        removeFromList,
        isInList 
    } = usePreferences();

    const [isCreatingList, setIsCreatingList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [newListDescription, setNewListDescription] = useState('');
    const [editingList, setEditingList] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});

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
            // Add the poster_path to the item before adding to list
            const itemWithPoster = {
                ...item,
                poster_path: item.poster_path || null
            };
            console.log('Adding item to list:', itemWithPoster);
            addToList(listId, itemWithPoster);
            // Reset the selection for this list
            setSelectedItems(prev => ({ ...prev, [listId]: '' }));
        }
    };

    const handleMovieClick = (item) => {
        const path = item.media_type === 'movie' ? '/movies' : '/series';
        navigate(`${path}/${item.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Favorites Section */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">My Favorites</h2>
                    <button
                        onClick={() => navigate('/recommendations')}
                        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg transition-colors"
                    >
                        <AiOutlineBulb /> Get Recommendations
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {favorites.map((item) => (
                        <div key={item.id} className="relative group">
                            <img
                                src={item.poster_path ? `${IMG_CDN_URL}${item.poster_path}` : MOVIE_BANNER}
                                alt={item.title || item.name}
                                className="w-full h-auto rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
                                onClick={() => handleMovieClick(item)}
                            />
                            <FavoriteButton media={item} />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 rounded-b-lg">
                                <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                                <p className="text-xs text-gray-400">{item.media_type === 'movie' ? 'Movie' : 'TV Show'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lists Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
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
                    <div className="bg-gray-800 p-4 rounded-lg mb-6">
                        <input
                            type="text"
                            placeholder="List Name"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                        />
                        <textarea
                            placeholder="List Description (optional)"
                            value={newListDescription}
                            onChange={(e) => setNewListDescription(e.target.value)}
                            className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => editingList ? handleUpdateList(editingList) : handleCreateList()}
                                className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded"
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
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Lists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lists.map((list) => (
                        <div key={list.id} className="bg-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{list.name}</h3>
                                    {list.description && (
                                        <p className="text-gray-400 text-sm mt-1">{list.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEditing(list)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <AiOutlineEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => removeList(list.id)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* List Items */}
                            <div className="grid grid-cols-2 gap-2">
                                {list.items.map((item) => (
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
                                            <AiOutlineDelete className="text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Add to List Button */}
                            <div className="mt-4">
                                <select
                                    className="w-full bg-gray-700 text-white p-2 rounded"
                                    value={selectedItems[list.id] || ''}
                                    onChange={(e) => {
                                        console.log('Select onChange:', e.target.value);
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyLists; 