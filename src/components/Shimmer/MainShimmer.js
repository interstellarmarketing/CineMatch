const MainShimmer = () => {
    return (
      <div className="flex flex-wrap pt-20 items-center justify-center gap-4 p-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="w-[140px] h-[280px] md:w-64 p-1 md:h-[280px] md:p-2 bg-gray-700 rounded-md animate-pulse"
          >
            <div className="w-full h-[220px] bg-gray-600 rounded-md"></div>
            <div className="mt-2 h-4 bg-gray-600 rounded"></div>
            <div className="mt-1 h-4 w-3/4 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  };

export default MainShimmer; 
  