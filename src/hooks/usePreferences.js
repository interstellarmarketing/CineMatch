import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import isEqual from 'lodash.isequal';
import { 
    addFavorite,
    removeFavorite,
    setFavorites,
    createList,
    updateList,
    deleteList,
    addItemToList,
    removeItemFromList,
    setLists,
    setSyncing,
    setLastSyncTimestamp,
    selectAllFavorites,
    selectAllListedItems
} from '../utils/redux/preferencesSlice';
import { 
    savePreferencesToFirestore, 
    loadPreferencesFromFirestore,
    updatePreferencesInFirestore,
    addFavoriteToFirestore,
    removeFavoriteFromFirestore,
    addListToFirestore,
    removeListFromFirestore
} from '../utils/preferencesFirestore';

const usePreferences = () => {
    const dispatch = useDispatch();
    const { favorites, lists, isSyncing } = useSelector((store) => store.preferences);
    const allListedItems = useSelector(selectAllListedItems);
    const user = useSelector((store) => store.user);

    // Track last saved state
    const lastSavedRef = useRef({ favorites: [], lists: [] });
    // Track last loaded user to prevent multiple loads
    const loadedUserId = useRef(null);

    // Debounced save function
    const debouncedSave = useCallback(
        debounce(async (userId, data) => {
            try {
                await savePreferencesToFirestore(userId, data);
                dispatch(setLastSyncTimestamp(Date.now()));
                // Update last saved ref after successful save
                lastSavedRef.current = {
                    favorites: data.favorites,
                    lists: data.lists
                };
            } catch (error) {
                console.error('Error in debounced save:', error);
                // You could dispatch an error state here if needed
            }
        }, 1000),
        []
    );

    // Load preferences from Firestore on mount (only once per user session)
    useEffect(() => {
        const loadPreferences = async () => {
            if (user && user.uid && loadedUserId.current !== user.uid) {
                loadedUserId.current = user.uid;
                try {
                    dispatch(setSyncing(true));
                    const savedPreferences = await loadPreferencesFromFirestore(user.uid);
                    if (savedPreferences) {
                        if (savedPreferences.favorites) {
                            dispatch(setFavorites(savedPreferences.favorites));
                        }
                        if (savedPreferences.lists) {
                            dispatch(setLists(savedPreferences.lists));
                        }
                        dispatch(setLastSyncTimestamp(Date.now()));
                        // Set last saved ref to loaded data
                        lastSavedRef.current = {
                            favorites: savedPreferences.favorites || [],
                            lists: savedPreferences.lists || []
                        };
                        
                        // Check if default Watchlist exists, if not create it
                        const hasWatchlist = savedPreferences.lists?.some(list => list.name.toLowerCase() === 'watchlist');
                        if (!hasWatchlist) {
                            console.log('Creating default Watchlist for new user');
                            const defaultWatchlist = {
                                id: Date.now().toString(),
                                name: 'Watchlist',
                                description: 'Your default watchlist for movies and TV shows',
                                items: [],
                                createdAt: Date.now(),
                                updatedAt: Date.now()
                            };
                            dispatch(createList(defaultWatchlist));
                            if (user) {
                                await addListToFirestore(user.uid, defaultWatchlist);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error loading preferences:', error);
                    // You could dispatch an error state here if needed
                } finally {
                    dispatch(setSyncing(false));
                }
            }
        };

        loadPreferences();
    }, [user, dispatch]);

    // Save preferences to Firestore whenever they change, but only if changed
    useEffect(() => {
        if (user && !isSyncing) {
            const hasChanged =
                !isEqual(favorites, lastSavedRef.current.favorites) ||
                !isEqual(lists, lastSavedRef.current.lists);
            if (hasChanged) {
                debouncedSave(user.uid, {
                    favorites,
                    lists
                });
            }
        }
    }, [favorites, lists, user, isSyncing, debouncedSave]);

    // Favorites management
    const toggleFavorite = async (media) => {
        const { id, title, media_type, poster_path, name } = media;
        const isFavorited = favorites.some(item => item.id === id);

        try {
            if (isFavorited) {
                dispatch(removeFavorite({ id }));
                if (user) {
                    // Find the full favorite object to remove
                    const favoriteToRemove = favorites.find(item => item.id === id);
                    await removeFavoriteFromFirestore(user.uid, favoriteToRemove);
                }
            } else {
                const newFavorite = {
                    id,
                    title: title || name,
                    media_type: media_type || 'tv',
                    poster_path,
                    timestamp: Date.now()
                };
                dispatch(addFavorite(newFavorite));
                if (user) {
                    await addFavoriteToFirestore(user.uid, newFavorite);
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            // You could dispatch an error state here if needed
        }
    };

    const isFavorite = (id) => {
        return favorites.some(item => item.id === id);
    };

    // List management
    const createNewList = async (name, description = '') => {
        try {
            const newList = {
                id: Date.now().toString(),
                name,
                description,
                items: [],
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            dispatch(createList(newList));
            if (user) {
                await addListToFirestore(user.uid, newList);
            }
        } catch (error) {
            console.error('Error creating list:', error);
            // You could dispatch an error state here if needed
        }
    };

    const updateListDetails = async (id, name, description) => {
        try {
            const updatedList = { id, name, description, updatedAt: Date.now() };
            dispatch(updateList(updatedList));
            if (user) {
                await updatePreferencesInFirestore(user.uid, {
                    lists: lists.map(list => 
                        list.id === id ? { ...list, ...updatedList } : list
                    )
                });
            }
        } catch (error) {
            console.error('Error updating list:', error);
            // You could dispatch an error state here if needed
        }
    };

    const removeList = async (id) => {
        try {
            const listToRemove = lists.find(list => list.id === id);
            dispatch(deleteList({ id }));
            if (user && listToRemove) {
                await removeListFromFirestore(user.uid, listToRemove);
            }
        } catch (error) {
            console.error('Error removing list:', error);
            // You could dispatch an error state here if needed
        }
    };

    // List items management
    const addToList = async (listId, item) => {
        try {
            const list = lists.find(list => list.id === listId);
            if (list && !list.items.some(i => i.id === item.id)) {
                const updatedList = {
                    ...list,
                    items: [...list.items, { ...item, addedAt: Date.now() }],
                    updatedAt: Date.now()
                };
                dispatch(addItemToList({ listId, item }));
                if (user) {
                    await updatePreferencesInFirestore(user.uid, {
                        lists: lists.map(l => l.id === listId ? updatedList : l)
                    });
                }
            }
        } catch (error) {
            console.error('Error adding item to list:', error);
            // You could dispatch an error state here if needed
        }
    };

    const removeFromList = async (listId, itemId) => {
        try {
            const list = lists.find(list => list.id === listId);
            if (list) {
                const updatedList = {
                    ...list,
                    items: list.items.filter(item => item.id !== itemId),
                    updatedAt: Date.now()
                };
                dispatch(removeItemFromList({ listId, itemId }));
                if (user) {
                    await updatePreferencesInFirestore(user.uid, {
                        lists: lists.map(l => l.id === listId ? updatedList : l)
                    });
                }
            }
        } catch (error) {
            console.error('Error removing item from list:', error);
            // You could dispatch an error state here if needed
        }
    };

    const isInList = (listId, itemId) => {
        const list = lists.find(list => list.id === listId);
        return list ? list.items.some(item => item.id === itemId) : false;
    };

    return {
        favorites,
        lists,
        allListedItems,
        isSyncing,
        toggleFavorite,
        isFavorite,
        createNewList,
        updateListDetails,
        removeList,
        addToList,
        removeFromList,
        isInList
    };
};

export default usePreferences; 