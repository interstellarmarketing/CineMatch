import { ACTOR_BANNER } from "../../utils/constants"

const CastCard = ({actorName, actorCharacter, actorProfilePath}) => {
  return (
    <div className="flex flex-col my-5 items-center w-36 md:w-56 text-white">
        <img
            alt ="movies"
            src = {actorProfilePath ? `https://image.tmdb.org/t/p/w500${actorProfilePath}` : ACTOR_BANNER} 
            className="w-28px h-[168px] rounded-full object-contain"
        />
        <h1 className="text-lg text-center font-semibold">{actorName}</h1>
        <h2 className="text-sm text-center text-gray-400">{actorCharacter}</h2>
        
    </div>
  )
}

export default CastCard