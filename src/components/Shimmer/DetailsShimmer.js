const DetailsShimmer = () => {
    return (
      <div className="pt-20 text-white">
        {/* Header Section */}
        <div className="flex max-md:flex-col justify-between md:m-10 md:mx-28">
          {/* Mobile Title */}
          <div className="flex flex-col md:hidden">
            <div className="h-8 w-48 bg-gray-700 animate-pulse mx-auto rounded"></div>
            <div className="h-5 w-32 bg-gray-700 animate-pulse mx-auto rounded mt-2"></div>
          </div>
  
          {/* Poster and Buttons */}
          <div className="flex flex-col gap-5 md:w-5/12 max-md:items-center max-md:mt-3">
            <div className="w-[300px] md:w-[350px] h-[450px] bg-gray-700 animate-pulse rounded"></div>
            <div className="flex gap-2 mt-5">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="w-24 h-10 bg-gray-700 animate-pulse rounded"></div>
              ))}
            </div>
          </div>
  
          {/* Details */}
          <div className="md:w-7/12">
            {/* Desktop Title */}
            <div className="hidden md:flex flex-col">
              <div className="h-8 w-72 bg-gray-700 animate-pulse mx-auto rounded"></div>
              <div className="h-5 w-40 bg-gray-700 animate-pulse mx-auto rounded mt-2"></div>
            </div>
  
            {/* Ratings and Stats */}
            <div className="my-3 flex justify-between max-md:mx-3 max-md:flex-col max-md:items-center">
              <div className="flex items-center gap-2 text-xl">
                <div className="w-16 h-6 bg-gray-700 animate-pulse rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className={`w-${i === 0 ? 16 : 20} h-6 bg-gray-700 animate-pulse rounded`}></div>
                ))}
              </div>
            </div>
  
            {/* Genres */}
            <div className="my-2 mt-4 max-md:mx-2">
              <div className="flex justify-center flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-20 h-8 bg-gray-700 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
  
            {/* Synopsis */}
            <div className="max-md:mx-3">
              <div className="h-6 w-28 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-20 w-full bg-gray-700 animate-pulse rounded mt-2"></div>
            </div>
          </div>
        </div>
  
        {/* Cast Section */}
        <Section title="Cast">
          <div className="flex gap-4 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-24 h-32 bg-gray-700 animate-pulse rounded-md flex-shrink-0"></div>
            ))}
          </div>
        </Section>
  
        {/* Trailer Section */}
        <Section title="Trailer">
          <div className="w-full h-[300px] bg-gray-700 animate-pulse rounded"></div>
        </Section>
      </div>
    );
  };
  
  // Section Component for Title and Content
  const Section = ({ title, children }) => (
    <div className="md:my-10 mx-3 md:mx-28">
      <div className="h-6 w-32 bg-gray-700 animate-pulse rounded mb-5"></div>
      {children}
    </div>
  );
  
  export default DetailsShimmer;
  