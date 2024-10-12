import { useSelector } from 'react-redux';

import CastCard from './CastCard';

const CastList = () => {
    const cast = useSelector((store) => store.details.castDetails);
  return (
    <div className='flex overflow-x-scroll scrollbar-hide'>
        <div className="flex scroll-smooth">
            {cast && cast.map((actor) => (
                <CastCard key={actor.id} actorName={actor.name} actorCharacter={actor.character.split(' / ')[0]} actorProfilePath ={actor.profile_path}/>
            ))}
        </div>
        
    </div>
  )
}

export default CastList