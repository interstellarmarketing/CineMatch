import { createSlice, createSelector } from "@reduxjs/toolkit";

const preferencesSlice = createSlice({
    name: "preferences",
    initialState: {
        favorites: [], // Array of {id, title, media_type, timestamp}
        lists: [], // Array of {id, name, description, items, createdAt, updatedAt}
        isSyncing: false,
        lastSyncTimestamp: null
    },
    reducers: {
        // Favorites management
        addFavorite: (state, action) => {
            const { id, title, media_type, poster_path } = action.payload;
            // Check if already favorited
            const exists = state.favorites.some(item => item.id === Number(id));
            if (!exists) {
                state.favorites.push({
                    id: Number(id),
                    title,
                    media_type,
                    poster_path,
                    timestamp: Date.now()
                });
            }
        },
        removeFavorite: (state, action) => {
            const { id } = action.payload;
            state.favorites = state.favorites.filter(item => item.id !== id);
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },

        // List management
        createList: (state, action) => {
            const { name, description } = action.payload;
            state.lists.push({
                id: Date.now().toString(),
                name,
                description,
                items: [],
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
        },
        updateList: (state, action) => {
            const { id, name, description } = action.payload;
            const list = state.lists.find(list => list.id === id);
            if (list) {
                list.name = name;
                list.description = description;
                list.updatedAt = Date.now();
            }
        },
        deleteList: (state, action) => {
            const { id } = action.payload;
            state.lists = state.lists.filter(list => list.id !== id);
        },

        // List items management
        addItemToList: (state, action) => {
            console.log('addItemToList reducer called with:', action.payload);
            const { listId, item } = action.payload;
            const list = state.lists.find(list => list.id === listId);
            console.log('Found list:', list);
            if (list) {
                // Check if item already exists in list
                const exists = list.items.some(i => i.id === item.id);
                console.log('Item exists in list:', exists);
                if (!exists) {
                    list.items.push({
                        ...item,
                        addedAt: Date.now()
                    });
                    list.updatedAt = Date.now();
                    console.log('Updated list items:', list.items);
                }
            }
        },
        removeItemFromList: (state, action) => {
            const { listId, itemId } = action.payload;
            const list = state.lists.find(list => list.id === listId);
            if (list) {
                list.items = list.items.filter(item => item.id !== itemId);
                list.updatedAt = Date.now();
            }
        },

        // Bulk operations
        setLists: (state, action) => {
            state.lists = action.payload;
        },
        setSyncing: (state, action) => {
            state.isSyncing = action.payload;
        },
        setLastSyncTimestamp: (state, action) => {
            state.lastSyncTimestamp = action.payload;
        }
    }
});

// Selectors
export const selectAllFavorites = (state) => state.preferences.favorites;

export const selectAllListedItems = createSelector(
    [(state) => state.preferences.lists],
    (lists) => {
        const allItems = lists.flatMap(list => list.items);
        // Remove duplicates based on id
        return Array.from(new Map(allItems.map(item => [item.id, item])).values());
    }
);

export const { 
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
    setLastSyncTimestamp 
} = preferencesSlice.actions;

export default preferencesSlice.reducer; 