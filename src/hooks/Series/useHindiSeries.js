import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants"
import { useDispatch } from "react-redux";
import { addHindiSeries} from "../../utils/redux/seriesSlice";


const useHindiSeries = (lang) => {
    const dispatch = useDispatch();

    const getHindiSeries = async (lang) => {
        const data = await fetch('https://api.themoviedb.org/3/discover/tv?language=en-US&page=4&with_original_language=hi', API_OPTIONS);
        const jsonData = await data.json();
        dispatch(addHindiSeries(jsonData.results));
    }

    useEffect(() => {
        getHindiSeries(lang);
    },[])

}

export default useHindiSeries;    