import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants"
import { useDispatch } from "react-redux";
import { addTrendingSeries } from "../../utils/redux/seriesSlice";


const useTrendingSeries = () => {
    const dispatch = useDispatch();

    const getTrendingSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US&region=US', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addTrendingSeries(jsonData.results));

    }

    useEffect(() => {
        getTrendingSeries();
    },[])

}

export default useTrendingSeries;    