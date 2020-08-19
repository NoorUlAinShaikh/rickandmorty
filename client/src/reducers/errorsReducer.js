import { ERRORS } from "../actions/types";

const INITIAL_STATE = {
  status: null,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  const { status, data: { error } = {} } = action.payload || {};
  switch (action.type) {
    case ERRORS:
      return { ...state, status, error };
    default:
      return state;
  }
};
