import {
  GET_BUDGET,
  GET_TOTAL,
  BUDGET_LOADING,
  CLEAR_CURRENT_BUDGET
} from "../actions/types";

const initialState = {
  budget: null,
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
        budget: action.payload,
        loading: false
      };
    case GET_TOTAL:
      return {
        ...state,
        total: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_BUDGET:
      return {
        ...state,
        budget: null
      };
    default:
      return state;
  }
}
