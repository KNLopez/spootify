import config from '../config';

const {
  api: { baseUrl, authUrl, clientId, clientSecret },
} = config;

const authOptions = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
  },
  body: 'grant_type=client_credentials',
  method: 'POST',
};

const defaultOptions = {
  headers: {},
};

export const authFetch = async () => {
  try {
    const auth = await (await fetch(authUrl, authOptions)).json();
    defaultOptions.headers.Authorization = `Bearer ${auth.access_token}`;
    return auth;
  } catch (err) {
    throw err;
  }
};

const apiFetch = async (endpoint, token) => {
  return await (await fetch(`${baseUrl + endpoint}`, defaultOptions)).json();
};

const getNewReleases = async () => {
  try {
    const response = await apiFetch(`/browse/new-releases`);
    return response?.albums?.items || [];
  } catch (err) {
    throw err;
  }
};

const getFeaturedPlaylist = async () => {
  try {
    const response = await apiFetch(`/browse/featured-playlists`);
    return response?.playlists?.items || [];
  } catch (err) {
    throw err;
  }
};

const getCategories = async () => {
  try {
    const response = await apiFetch(`/browse/categories`);
    return response?.categories?.items || [];
  } catch (err) {
    throw err;
  }
};

const spotifyQuery = async () => {
  await authFetch();
  return Promise.all([
    getNewReleases(),
    getFeaturedPlaylist(),
    getCategories(),
  ]);
};

export default spotifyQuery;
