import { FETCH_ALLEPISODES, FETCH_SEASON } from "../actions/types";

const INITIAL_STATE = {
  list: [],
  info: {},
};

export default (state = INITIAL_STATE, action) => {
  const { results, info } = action.payload || {};
  switch (action.type) {
    case FETCH_ALLEPISODES:
    case FETCH_SEASON:
      return { ...state, list: results, info };
    default:
      return state;
  }
};
