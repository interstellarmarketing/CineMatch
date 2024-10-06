

const usePopulaMovies = () => {
    
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
        const jsonData = await data.json();

        console.log(jsonData);

    }

    useEffect(() => {
        getPopularMovies();
    },[])

}

export default usePopulaMovies