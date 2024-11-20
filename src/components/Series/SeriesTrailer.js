import React from 'react'
import { useSelector } from 'react-redux';
import useSeriesTrailer from '../../hooks/Series/useSeriesTrailer';

const SeriesTrailer = ({movieId}) => {

    useSeriesTrailer(movieId);

    const trailer = useSelector(store => store.series?.seriesTrailer); //subscribe to the store

    
  return (
    <div className='md:mx-40 md:mt-10 py-5' id='trailer'>
        <iframe   
        className="w-full h-full aspect-video rounded-xl"
        src= {"https://www.youtube.com/embed/"+trailer?.key+"?rel=0&showinfo=0"} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
        >
        </iframe>
    </div>
  )
}

export default SeriesTrailer