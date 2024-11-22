import React from 'react'
import { GENRES } from '../utils/genreIcons'

const Categories = () => {
  const handleGenreClick = (genre) => {
    if (genre === 'Action'){
      console.log("Action Clicked")
    }else if (genre === 'Adventure'){
      console.log("Adventure Clicked")
    }else{
      console.log("Other Genre Clicked")
    }
    
  }

  return (
    <div className='flex pt-20 p-6 justify-between w-full h-screen bg-gray-900 text-white'>
        <div className='w-2/12 border-r-2 h-full overflow-y-scroll scrollbar-hide'>
            <div>
                <h1 className='text-center font-bold text-xl'>Categories</h1>
            </div>
            <div className=''>
                {
                  GENRES.map((catergory, index) => {
                      return (
                          <div key={index} className='flex gap-2 items-center p-3 hover:text-sky-400 cursor-pointer' onclick={handleGenreClick(catergory.genre)}>
                              <div className='text-3xl'>
                                  {catergory.logo}
                              </div>
                              <div className='text xl'>
                                  <h1>{catergory.genre}</h1>
                              </div>
                          </div>
                      )
                    })
                }
            </div>
        </div>
        <div className='w-10/12'>
            <h1>main column</h1>
        </div>
    </div>
  )
}

export default Categories