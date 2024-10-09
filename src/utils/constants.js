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
        "https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_large.jpg"
        
        
export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500';
export const IMG_CDN_ORG_URL = 'https://image.tmdb.org/t/p/original';