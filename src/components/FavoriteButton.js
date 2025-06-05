import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import usePreferences from "../hooks/usePreferences";

const FavoriteButton = ({ media }) => {
    const { toggleFavorite, isFavorite } = usePreferences();
    const favorited = isFavorite(media.id);

    const handleClick = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation(); // Prevent event bubbling
        toggleFavorite(media);
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
            {favorited ? (
                <AiFillHeart className="text-red-500 text-xl" />
            ) : (
                <AiOutlineHeart className="text-white text-xl hover:text-red-500 transition-colors duration-200" />
            )}
        </button>
    );
};

export default FavoriteButton; 