import { combineReducers } from "redux";
import episodesReducer from "./episodesReducer";
import searchReducer from "./searchReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  episodes: episodesReducer,
  errors: errorsReducer,
  search: searchReducer,
});
