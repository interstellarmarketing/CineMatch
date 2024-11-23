const CategoryShimmer = () => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-[180px] md:w-56 h-[280px] p-2 bg-gray-700 rounded-md animate-pulse"
          >
            <div className="w-full h-[220px] bg-gray-600 rounded-md"></div>
            <div className="mt-2 h-4 bg-gray-600 rounded"></div>
            <div className="mt-1 h-4 w-3/4 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  };

export default CategoryShimmer; 
  