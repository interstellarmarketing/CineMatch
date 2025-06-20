import { MdBookmarkAdd, MdBookmark } from "react-icons/md";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { PreferencesContext } from "../App";

const sizeClassMap = {
  '2xs': 'text-lg',
  'xs': 'text-xl',
  'sm': 'text-2xl',
  'md': 'text-3xl',
  'lg': 'text-4xl',
  'xl': 'text-5xl',
};

const WatchlistButton = ({ media, size }) => {
    const lists = useSelector((state) => state.preferences.lists);
    const { addToList, removeFromList, createNewList } = useContext(PreferencesContext);
    
    // Find the watchlist
    let watchlist = lists.find(list => list.name.toLowerCase() === 'watchlist');
    
    // If watchlist doesn't exist, create it
    if (!watchlist) {
        console.log('Watchlist not found, creating default watchlist');
        createNewList('Watchlist', 'Your default watchlist for movies and TV shows');
        // The watchlist will be created asynchronously, so we'll use the current state
        watchlist = lists.find(list => list.name.toLowerCase() === 'watchlist');
    }
    
    const inWatchlist = watchlist ? watchlist.items.some(item => item.id === media.id) : false;
    const iconSizeClass = sizeClassMap[size] || 'text-2xl';

    const handleClick = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation(); // Prevent event bubbling
        
        console.log('WatchlistButton clicked:', { media, watchlist, inWatchlist });
        
        if (watchlist) {
            if (inWatchlist) {
                console.log('Removing from watchlist:', media.id);
                removeFromList(watchlist.id, media.id);
            } else {
                console.log('Adding to watchlist:', media);
                addToList(watchlist.id, media);
            }
        } else {
            console.log('No watchlist found, creating one first');
            createNewList('Watchlist', 'Your default watchlist for movies and TV shows');
            // After creating, we need to add the item
            // This will be handled in the next render cycle
        }
    };

    return (
        <button
            onClick={handleClick}
            className="transition-all duration-200 h-auto w-auto p-0 m-0 leading-none flex items-center justify-center"
            aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
            {inWatchlist ? (
                <MdBookmark className={`text-sky-500 ${iconSizeClass} drop-shadow`} />
            ) : (
                <MdBookmarkAdd className={`text-white ${iconSizeClass} hover:text-sky-500 transition-colors duration-200 drop-shadow`} />
            )}
        </button>
    );
};

export default WatchlistButton; 