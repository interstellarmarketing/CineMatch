import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    updatePreferencesInFirestore
} from '../utils/preferencesFirestore';

const usePreferences = () => {
    const dispatch = useDispatch();
    const { favorites, lists, isSyncing } = useSelector((store) => store.preferences);
    const allListedItems = useSelector(selectAllListedItems);
    const user = useSelector((store) => store.user);

    // Load preferences from Firestore on mount
    useEffect(() => {
        const loadPreferences = async () => {
            if (user) {
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
                    }
                } catch (error) {
                    console.error('Error loading preferences:', error);
                } finally {
                    dispatch(setSyncing(false));
                }
            }
        };

        loadPreferences();
    }, [user, dispatch]);

    // Save preferences to Firestore whenever they change
    useEffect(() => {
        const savePreferences = async () => {
            if (user && !isSyncing) {
                try {
                    await savePreferencesToFirestore(user.uid, {
                        favorites,
                        lists
                    });
                } catch (error) {
                    console.error('Error saving preferences:', error);
                }
            }
        };

        savePreferences();
    }, [favorites, lists, user, isSyncing]);

    // Favorites management
    const toggleFavorite = async (media) => {
        const { id, title, media_type, poster_path, name } = media;
        const isFavorited = favorites.some(item => item.id === id);

        if (isFavorited) {
            dispatch(removeFavorite({ id }));
            if (user) {
                try {
                    await updatePreferencesInFirestore(user.uid, {
                        favorites: favorites.filter(item => item.id !== id)
                    });
                } catch (error) {
                    console.error('Error updating favorites:', error);
                }
            }
        } else {
            // For TV shows, use name instead of title and ensure media_type is 'tv'
            const newFavorite = {
                id,
                title: title || name, // Use name if title is not available (for TV shows)
                media_type: media_type || 'tv', // Default to 'tv' if media_type is not specified
                poster_path,
                timestamp: Date.now()
            };
            dispatch(addFavorite(newFavorite));
            if (user) {
                try {
                    await updatePreferencesInFirestore(user.uid, {
                        favorites: [...favorites, newFavorite]
                    });
                } catch (error) {
                    console.error('Error updating favorites:', error);
                }
            }
        }
    };

    const isFavorite = (id) => {
        return favorites.some(item => item.id === id);
    };

    // List management
    const createNewList = async (name, description = '') => {
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
            try {
                await updatePreferencesInFirestore(user.uid, {
                    lists: [...lists, newList]
                });
            } catch (error) {
                console.error('Error creating list:', error);
            }
        }
    };

    const updateListDetails = async (id, name, description) => {
        const updatedList = { id, name, description, updatedAt: Date.now() };
        dispatch(updateList(updatedList));
        if (user) {
            try {
                await updatePreferencesInFirestore(user.uid, {
                    lists: lists.map(list => 
                        list.id === id ? { ...list, ...updatedList } : list
                    )
                });
            } catch (error) {
                console.error('Error updating list:', error);
            }
        }
    };

    const removeList = async (id) => {
        dispatch(deleteList({ id }));
        if (user) {
            try {
                await updatePreferencesInFirestore(user.uid, {
                    lists: lists.filter(list => list.id !== id)
                });
            } catch (error) {
                console.error('Error removing list:', error);
            }
        }
    };

    // List items management
    const addToList = async (listId, item) => {
        const list = lists.find(list => list.id === listId);
        if (list && !list.items.some(i => i.id === item.id)) {
            const updatedList = {
                ...list,
                items: [...list.items, { ...item, addedAt: Date.now() }],
                updatedAt: Date.now()
            };
            dispatch(addItemToList({ listId, item }));
            if (user) {
                try {
                    await updatePreferencesInFirestore(user.uid, {
                        lists: lists.map(l => l.id === listId ? updatedList : l)
                    });
                } catch (error) {
                    console.error('Error adding item to list:', error);
                }
            }
        }
    };

    const removeFromList = async (listId, itemId) => {
        const list = lists.find(list => list.id === listId);
        if (list) {
            const updatedList = {
                ...list,
                items: list.items.filter(item => item.id !== itemId),
                updatedAt: Date.now()
            };
            dispatch(removeItemFromList({ listId, itemId }));
            if (user) {
                try {
                    await updatePreferencesInFirestore(user.uid, {
                        lists: lists.map(l => l.id === listId ? updatedList : l)
                    });
                } catch (error) {
                    console.error('Error removing item from list:', error);
                }
            }
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