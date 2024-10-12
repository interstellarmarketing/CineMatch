const CastCard = ({actorName, actorCharacter, actorProfilePath}) => {
  return (
    <div className="flex flex-col items-center w-64 text-white">
        <img
            alt ="movies"
            src = {`https://image.tmdb.org/t/p/w500${actorProfilePath}`} 
            className="w-44 h-44 rounded-full object-contain"
        />
        <h1 className="text-2xl">{actorName}</h1>
        <h2 className="text-lg">{actorCharacter}</h2>
        
    </div>
  )
}

export default CastCard