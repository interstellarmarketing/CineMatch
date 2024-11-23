import React, { useEffect } from 'react'

const Anime = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-red-500">
        <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white animate-pulse">
            Coming Soon
            </h1>
            <p className="mt-4 text-lg md:text-2xl text-gray-200">
            Something amazing is on its way. Stay tuned!
            </p>
            <div className="mt-6">
            <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
                Notify Me
            </button>
            </div>
        </div>
    </div>

  )
}

export default Anime