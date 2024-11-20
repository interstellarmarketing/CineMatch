import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants"
import { useDispatch } from "react-redux";
import { addHindiSeries, addMalayalamSeries, addTamilSeries, addTeluguSeries } from "../../utils/redux/seriesSlice";


const useTamilSeries = (lang) => {
    const dispatch = useDispatch();

    const getTamilSeries = async (lang) => {
        const data = await fetch('https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&with_original_language='+lang, API_OPTIONS);
        const jsonData = await data.json();
        if (lang === 'ta') {
            dispatch(addTamilSeries(jsonData.results));
        }else if (lang === 'hi') {
            dispatch(addHindiSeries(jsonData.results));
        }else if (lang === 'ml'){
            dispatch(addMalayalamSeries(jsonData.results));
        }else if (lang === 'te'){
            dispatch(addTeluguSeries(jsonData.results));
        }
    }

    useEffect(() => {
        getTamilSeries(lang);
    },[])

}

export default useTamilSeries;    