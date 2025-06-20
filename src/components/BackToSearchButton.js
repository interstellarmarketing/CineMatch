import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSearchContext } from '../utils/redux/geminiSlice';
import { IoArrowBack } from 'react-icons/io5';

const BackToSearchButton = () => {
  const { isFromGPTSearch, searchQuery } = useSelector((store) => store.gemini);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Only show button if user came from GPT search
  if (!isFromGPTSearch) return null;

  const handleBackToSearch = () => {
    // Navigate back to GPT search page
    navigate('/gptsearch');
    // Don't clear the search context yet - let the user see their results
  };

  return (
    <button
      onClick={handleBackToSearch}
      className="
        fixed top-20 left-0 z-40
        flex items-center gap-2
        bg-gradient-to-r from-blue-500/90 to-purple-600/90
        hover:from-blue-600 hover:to-purple-700
        text-white font-semibold px-4 py-2 rounded-r-lg
        shadow-lg hover:shadow-xl
        transition-all duration-300 hover:scale-105
        backdrop-blur-sm border border-blue-400/30
        border-l-0
      "
      title={`Back to search results for "${searchQuery}"`}
    >
      <IoArrowBack className="w-4 h-4 flex-shrink-0" />
      <span>Back</span>
    </button>
  );
};

export default BackToSearchButton; 