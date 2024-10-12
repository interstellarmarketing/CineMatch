import { useSelector } from 'react-redux';
import useCastDetails from '../hooks/useCastDetatils';
import CastCard from './CastCard';

const CastList = ({movId}) => {
    useCastDetails(movId);
    const cast = useSelector((store) => store.details.castDetails);
  return (
    <div>
        {cast && cast.map((actor) => (
            <CastCard key={actor.id} actorName={actor.name}/>
        ))}
    </div>
  )
}

export default CastList