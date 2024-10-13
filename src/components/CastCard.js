const CastCard = ({actorName, actorCharacter, actorProfilePath}) => {
  return (
    <div className="flex flex-col items-center w-56 text-white">
        <img
            alt ="movies"
            src = {`https://image.tmdb.org/t/p/w500${actorProfilePath}`} 
            className="w-28 h-[168px] rounded-full object-contain"
        />
        <h1 className="text-lg font-semibold">{actorName}</h1>
        <h2 className="text-sm text-gray-400">{actorCharacter}</h2>
        
    </div>
  )
}

export default CastCard