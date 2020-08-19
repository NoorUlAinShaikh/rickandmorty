import {
  SELECTED_SEASON,
  SEARCH_RESULTS,
  FETCH_EPISODE,
} from "../actions/types";

const INITIAL_STATE = {
  filteredList: [],
  selectedSeason: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, filteredList: action.payload };
    case SELECTED_SEASON:
      return { ...state, selectedSeason: action.payload };
    case FETCH_EPISODE:
      return { ...state, filteredList: action.payload.results };
    default:
      return state;
  }
};
