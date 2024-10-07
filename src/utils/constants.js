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