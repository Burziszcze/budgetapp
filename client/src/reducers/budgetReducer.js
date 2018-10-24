import {
  GET_BUDGET,
  BUDGET_LOADING,
  CLEAR_CURRENT_BUDGET
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BUDGET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BUDGET:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_BUDGET:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
