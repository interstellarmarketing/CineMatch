import { useSelector } from 'react-redux';

import CastCard from './CastCard';
import { Link } from 'react-router-dom';

const CastList = () => {
    const cast = useSelector((store) => store.details.castDetails);

    console.log(cast);
  return (
    <div className='flex overflow-x-scroll scrollbar-hide'>
        <div className="flex scroll-smooth">
            {cast && cast.map((actor) => (
              <Link to={'/cast/'+actor.id} >
                <CastCard key={actor.id} actorName={actor.name} actorCharacter={actor.character.split(' / ')[0]} actorProfilePath ={actor.profile_path}/>
              </Link>
            ))}
        </div>
        
    </div>
  )
}

export default CastList