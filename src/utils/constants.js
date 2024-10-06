import { TMBD_API_KEY } from "./API_KEYS";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TMBD_API_KEY
    }
};