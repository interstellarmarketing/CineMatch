// Usage: node scripts/importToAlgolia.mjs
// This script fetches popular movies from TMDB and uploads them to Algolia

import fetch from 'node-fetch';
import { TMDB_API_KEY_V3 } from '../src/utils/API_KEYS.js';

const algoliasearchModule = await import('algoliasearch');
const algoliasearch = algoliasearchModule.algoliasearch;

// Algolia credentials (replace with your own)
const ALGOLIA_APP_ID = '2O1QGKM30B'; // Updated Application ID
const ALGOLIA_WRITE_API_KEY = '2668d1c40942b1f3a5f4918b1903e8ef'; // Updated Write API Key
const ALGOLIA_INDEX_NAME = 'movies_index';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);

// Fetch movies from TMDB (first page)
async function fetchTMDBMovies(page = 1) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY_V3}&language=en-US&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch from TMDB');
  const data = await response.json();
  return data.results;
}

// Transform TMDB data for Algolia
function transformMovies(movies) {
  return movies.map(movie => ({
    objectID: movie.id, // Algolia requires a unique objectID
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    genre_ids: movie.genre_ids,
    // Add any other fields you want searchable/filterable
  }));
}

// Main function to fetch, transform, and upload
async function processAndUpload() {
  try {
    const movies = await fetchTMDBMovies();
    console.log('Fetched movies:', movies);
    const transformed = transformMovies(movies);
    console.log('Transformed movies:', transformed);
    await client.saveObjects({
      indexName: ALGOLIA_INDEX_NAME,
      objects: transformed
    });
    console.log('Successfully indexed TMDB movies!');
  } catch (err) {
    console.error('Error indexing movies:', err);
  }
}

processAndUpload(); 