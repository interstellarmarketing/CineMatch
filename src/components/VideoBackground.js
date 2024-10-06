import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({movieId}) => {
  useMovieTrailer(movieId);
  return (
    <div>VideoBackground</div>
  )
}

export default VideoBackground