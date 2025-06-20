import { useState } from 'react';

const ShowMoreText = ({ text, lines = 3, textSize = 'text-base' }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  return (
    <div className="relative">
      <div
        className={`${textSize} text-gray-200 transition-all duration-300 ${
          !expanded && `line-clamp-${lines}`
        }`}
      >
        {text}
      </div>
      {text.length > 180 && (
        <button
          className="mt-2 text-sm font-semibold text-yellow-400 hover:underline focus:outline-none"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default ShowMoreText; 