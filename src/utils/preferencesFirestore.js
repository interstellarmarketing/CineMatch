import { db } from './firebase';
import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { auth } from './firebase';

// Utility function to log Firestore operations
const logFirestoreOperation = (operation, details) => {
    console.log(`[Firestore ${operation}]`, {
        ...details,
        timestamp: new Date().toISOString(),
        dataSize: details.data ? JSON.stringify(details.data).length : 0
    });
};

// Utility function to handle Firestore errors
const handleFirestoreError = (error, operation) => {
    console.error(`[Firestore ${operation} Error]:`, {
        code: error.code,
        message: error.message,
        timestamp: new Date().toISOString()
    });

    if (error.code === 'resource-exhausted') {
        console.warn('Firebase quota exceeded. Consider implementing retry logic or upgrading plan.');
        // You could implement retry logic here
        return new Error('Service temporarily unavailable. Please try again later.');
    }

    return error;
};

// Save user preferences to Firestore
export const savePreferencesToFirestore = async (userId, preferences) => {
    if (!auth.currentUser) {
        throw new Error('User must be authenticated to save preferences');
    }

    try {
        logFirestoreOperation('save', { userId, data: preferences });
        
        const userPrefsRef = doc(db, 'userPreferences', userId);
        await setDoc(userPrefsRef, {
            ...preferences,
            lastUpdated: new Date().toISOString()
        });

        logFirestoreOperation('save-success', { userId });
    } catch (error) {
        throw handleFirestoreError(error, 'save');
    }
};

let loadCallCount = 0;

// Load user preferences from Firestore
export const loadPreferencesFromFirestore = async (userId) => {
    if (!auth.currentUser) {
        throw new Error('User must be authenticated to load preferences');
    }

    const callId = ++loadCallCount;
    console.log(`[Firestore load] CALL #${callId} for userId:`, userId, '\nStack:', new Error().stack);

    try {
        logFirestoreOperation('load', { userId, callId });
        
        const userPrefsRef = doc(db, 'userPreferences', userId);
        const docSnap = await getDoc(userPrefsRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            logFirestoreOperation('load-success', { userId, dataSize: JSON.stringify(data).length, callId });
            return data;
        } else {
            // Initialize with empty preferences if none exist
            const initialPreferences = {
                favorites: [],
                lists: [],
                lastUpdated: new Date().toISOString()
            };
            await savePreferencesToFirestore(userId, initialPreferences);
            logFirestoreOperation('load-initial', { userId, callId });
            return initialPreferences;
        }
    } catch (error) {
        throw handleFirestoreError(error, 'load');
    }
};

// Update specific fields in user preferences
export const updatePreferencesInFirestore = async (userId, updates) => {
    if (!auth.currentUser) {
        throw new Error('User must be authenticated to update preferences');
    }

    try {
        logFirestoreOperation('update', { userId, data: updates });
        
        const userPrefsRef = doc(db, 'userPreferences', userId);
        await updateDoc(userPrefsRef, {
            ...updates,
            lastUpdated: new Date().toISOString()
        });

        logFirestoreOperation('update-success', { userId });
    } catch (error) {
        throw handleFirestoreError(error, 'update');
    }
};

// Add a single favorite
export const addFavoriteToFirestore = async (userId, favorite) => {
    if (!auth.currentUser) throw new Error('User must be authenticated to add favorite');
    const userPrefsRef = doc(db, 'userPreferences', userId);
    try {
        logFirestoreOperation('add-favorite', { userId, favorite });
        await updateDoc(userPrefsRef, { favorites: arrayUnion(favorite), lastUpdated: new Date().toISOString() });
    } catch (error) {
        throw handleFirestoreError(error, 'add-favorite');
    }
};

// Remove a single favorite
export const removeFavoriteFromFirestore = async (userId, favorite) => {
    if (!auth.currentUser) throw new Error('User must be authenticated to remove favorite');
    const userPrefsRef = doc(db, 'userPreferences', userId);
    try {
        logFirestoreOperation('remove-favorite', { userId, favorite });
        await updateDoc(userPrefsRef, { favorites: arrayRemove(favorite), lastUpdated: new Date().toISOString() });
    } catch (error) {
        throw handleFirestoreError(error, 'remove-favorite');
    }
};

// Add a single list
export const addListToFirestore = async (userId, list) => {
    if (!auth.currentUser) throw new Error('User must be authenticated to add list');
    const userPrefsRef = doc(db, 'userPreferences', userId);
    try {
        logFirestoreOperation('add-list', { userId, list });
        await updateDoc(userPrefsRef, { lists: arrayUnion(list), lastUpdated: new Date().toISOString() });
    } catch (error) {
        throw handleFirestoreError(error, 'add-list');
    }
};

// Remove a single list
export const removeListFromFirestore = async (userId, list) => {
    if (!auth.currentUser) throw new Error('User must be authenticated to remove list');
    const userPrefsRef = doc(db, 'userPreferences', userId);
    try {
        logFirestoreOperation('remove-list', { userId, list });
        await updateDoc(userPrefsRef, { lists: arrayRemove(list), lastUpdated: new Date().toISOString() });
    } catch (error) {
        throw handleFirestoreError(error, 'remove-list');
    }
}; 