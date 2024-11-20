import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants"
import { useDispatch } from "react-redux";
import { addTamilSeries } from "../../utils/redux/seriesSlice";


const useTamilSeries = () => {
    const dispatch = useDispatch();

    const getTamilSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&with_original_language=ta', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addTamilSeries(jsonData.results));

    }

    useEffect(() => {
        getTamilSeries();
    },[])

}

export default useTamilSeries;    