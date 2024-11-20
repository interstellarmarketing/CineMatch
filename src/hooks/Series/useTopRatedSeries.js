import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addTopRatedSeries } from "../../utils/redux/seriesSlice";


const useTopRatedSeries = () => {
    const dispatch = useDispatch();

    const getTopRatedSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addTopRatedSeries(jsonData.results));

    }

    useEffect(() => {
        getTopRatedSeries();
    },[])

}

export default useTopRatedSeries;    