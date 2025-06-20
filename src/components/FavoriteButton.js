import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { PreferencesContext } from "../App";
import { selectAllFavorites } from "../utils/redux/preferencesSlice";

const sizeClassMap = {
  '2xs': 'text-lg',
  'xs': 'text-xl',
  'sm': 'text-2xl',
  'md': 'text-3xl',
  'lg': 'text-4xl',
  'xl': 'text-5xl',
};

const FavoriteButton = ({ media, size }) => {
    const favorites = useSelector(selectAllFavorites);
    const { toggleFavorite } = useContext(PreferencesContext);
    const favorited = favorites.some(item => item.id === media.id);
    const iconSizeClass = sizeClassMap[size] || 'text-2xl';

    const handleClick = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation(); // Prevent event bubbling
        toggleFavorite(media);
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-0 right-0 transition-all duration-200 h-auto w-auto p-0 m-0 leading-none flex items-start justify-end"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
            {favorited ? (
                <MdFavorite className={`text-red-500 ${iconSizeClass} drop-shadow`} />
            ) : (
                <MdFavoriteBorder className={`text-white ${iconSizeClass} hover:text-red-500 transition-colors duration-200 drop-shadow`} />
            )}
        </button>
    );
};

export default FavoriteButton; 