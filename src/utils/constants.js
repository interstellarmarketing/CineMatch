import { TMDB_API_KEY } from "./API_KEYS";


export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TMDB_API_KEY,
    }
};

export const VIDEO_URL = 'https://api.themoviedb.org/3/movie/';

export const VIDEO_URL_END = '/videos?language=en-US';

export const LOGO = 'https://i.ibb.co/tJsszfL/flimnest-logo2.png';

export const COVER_IMAGE =
          "https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg"
        
        
export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500';
export const IMG_CDN_ORG_URL = 'https://image.tmdb.org/t/p/original';

export const GOOGLE_URL = 'https://www.google.com/search?q=';
export const IMDB_URL = 'https://www.imdb.com/title/';

export const MOVIE_BANNER = 'https://utfs.io/f/0Gl64F1LqW8AyVKfKPBL23UVxRaD91gjGBwqWErKHuoScT6F'
export const SERIES_BANNER = 'https://utfs.io/f/0Gl64F1LqW8AyXAlwqBL23UVxRaD91gjGBwqWErKHuoScT6F'
export const ACTOR_BANNER = 'https://utfs.io/f/0Gl64F1LqW8AzpvQZNId7O3n0CwI1YRZ5lVtTFNGou9AE8Qc'
export const PROD_LOGO ='https://utfs.io/f/0Gl64F1LqW8ASsIb2XUfmCFVWPrR6B3Dn9yoKa2jLgY0Sexd'

export const SUPPORTED_LANGUAGES = [{identifier: 'en', name: 'English'}, 
  {identifier: 'ta', name: 'Tamil'}, 
  {identifier: 'hi', name: 'Hindi'},
  {identifier: 'ka', name: 'Kannada'},];