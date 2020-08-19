import ricknmorty from "../apis/ricknmorty";
import history from "../history";
import {
  FETCH_SEASON,
  FETCH_ALLEPISODES,
  FETCH_EPISODE,
  ERRORS,
  SELECTED_SEASON,
  SEARCH_RESULTS
} from "../actions/types";

//set selected season
export const setSelectedSeason = season => ({
  type: SELECTED_SEASON,
  payload: season
});

//set filtered results
export const setFilteredResults = searchResults => ({
  type: SEARCH_RESULTS,
  payload: searchResults
});

//fetch a single season
export const fetchSeason = season => async dispatch => {
  try {
    const response = await ricknmorty.get(`/episode?episode=${season}`);
    dispatch({ type: FETCH_SEASON, payload: response.data });
    history.push(`/episodes?episode=${season}`);
  } catch (err) {
    handleFetchErrors(err.response, dispatch);
  }
};

//fetch all episodes
export const fetchAllEpisodes = (page = null) => async dispatch => {
  try {
    console.log("fetchEpisodes called awaiting result", page);
    const response = await ricknmorty.get(`/episode${page ? `?page=${page}` : ""}`);
    console.log("response:", response);
    dispatch({ type: FETCH_ALLEPISODES, payload: response.data });
    if (!history.location.pathname.includes("episode=")) history.push("/episodes");
  } catch (err) {
    handleFetchErrors(err.response, dispatch);
  }
};

//fetch a single episode
export const fetchEpisode = (name, season = null) => async dispatch => {
  try {
    const path2get = `/episode?name=${name}${season ? `&episode=${season}` : ""}`;
    const response = await ricknmorty.get(path2get);
    dispatch({ type: FETCH_EPISODE, payload: response.data });
    history.push(`/episodes?name=${name}`);
  } catch (err) {
    handleFetchErrors(err.response, dispatch);
  }
};

const handleFetchErrors = (err, dispatch) => {
  console.log("err:", err);
  dispatch({ type: ERRORS, payload: err });
  history.push("/error");
};
