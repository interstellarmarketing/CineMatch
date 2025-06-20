// Initialize Algolia client
const ALGOLIA_APP_ID = '2O1QGKM30B';
const ALGOLIA_SEARCH_API_KEY = '2668d1c40942b1f3a5f4918b1903e8ef';
const ALGOLIA_INDEX_NAME = 'movies_index';

let searchClient = null;
let index = null;

export const initAlgolia = async () => {
  try {
    if (!searchClient) {
      console.log('Initializing Algolia client...');
      const algoliasearchModule = await import('algoliasearch');
      const algoliasearch = algoliasearchModule.algoliasearch;
      searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);
      index = searchClient.index(ALGOLIA_INDEX_NAME);
      console.log('Algolia client initialized successfully');
    }
    return { searchClient, index };
  } catch (error) {
    console.error('Error in initAlgolia:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    console.log('Starting search with query:', query);
    if (!index) {
      console.log('Index not initialized, initializing now...');
      await initAlgolia();
    }
    console.log('Performing search...');
    const results = await index.search(query, {
      hitsPerPage: 20,
      attributesToRetrieve: ['*'],
    });
    console.log('Search results:', results);
    return results;
  } catch (error) {
    console.error('Error in searchMovies:', error);
    throw error;
  }
}; 