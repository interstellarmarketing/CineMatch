import { db } from './firebase';
import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';

// Save user preferences to Firestore
export const savePreferencesToFirestore = async (userId, preferences) => {
    try {
        const userPrefsRef = doc(db, 'userPreferences', userId);
        await setDoc(userPrefsRef, {
            ...preferences,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving preferences to Firestore:', error);
        throw error;
    }
};

// Load user preferences from Firestore
export const loadPreferencesFromFirestore = async (userId) => {
    try {
        const userPrefsRef = doc(db, 'userPreferences', userId);
        const docSnap = await getDoc(userPrefsRef);
        
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // Initialize with empty preferences if none exist
            const initialPreferences = {
                favorites: [],
                lists: [],
                lastUpdated: new Date().toISOString()
            };
            await savePreferencesToFirestore(userId, initialPreferences);
            return initialPreferences;
        }
    } catch (error) {
        console.error('Error loading preferences from Firestore:', error);
        throw error;
    }
};

// Update specific fields in user preferences
export const updatePreferencesInFirestore = async (userId, updates) => {
    try {
        const userPrefsRef = doc(db, 'userPreferences', userId);
        await updateDoc(userPrefsRef, {
            ...updates,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating preferences in Firestore:', error);
        throw error;
    }
}; 