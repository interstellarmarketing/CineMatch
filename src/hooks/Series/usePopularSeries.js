import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants"
import { useDispatch } from "react-redux";
import { addPopularSeries, addTopRatedSeries } from "../../utils/redux/seriesSlice";


const usePopularSeries = () => {
    const dispatch = useDispatch();

    const getPopularSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&region=US', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addPopularSeries(jsonData.results));

    }

    useEffect(() => {
        getPopularSeries();
    },[])

}

export default usePopularSeries;    