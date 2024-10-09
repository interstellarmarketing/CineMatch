//custom hooks
import useMovieTrailer from '../hooks/useMovieTrailer'

//redux
import { useSelector } from 'react-redux'

const VideoBackground = ({movieId}) => {

  const trailer = useSelector(store => store.movies?.movieTrailer); //subscribe to the store
  console.log(trailer);
  useMovieTrailer(movieId);
  return (
    <div className="w-full h-screen">
      <iframe   
        className="w-full aspect-video absolute -top-14 "
        src= {"https://www.youtube.com/embed/"+trailer?.key+"?rel=0&showinfo=0&autoplay=1&mute=1&controls=0&loop=1"} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
      >
      </iframe>
    </div>
  )
}

export default VideoBackground