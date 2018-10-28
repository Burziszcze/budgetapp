import axios from "axios";
import swal from "sweetalert";

import {
  GET_BUDGET,
  GET_ERRORS,
  BUDGET_LOADING,
  CLEAR_CURRENT_BUDGET,
  SET_CURRENT_USER
} from "./types";

// Get current profile
export const getCurrentBudget = () => dispatch => {
  dispatch(setBudgetLoading());
  axios
    .get("/api/budget")
    .then(res =>
      dispatch({
        type: GET_BUDGET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BUDGET,
        payload: {}
      })
    );
};

// Get budget by handle
export const getBudgetByHandle = budget => dispatch => {
  dispatch(setBudgetLoading());
  axios
    .get(`/api/budget/budget/${budget}`)
    .then(res =>
      dispatch({
        type: GET_BUDGET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BUDGET,
        payload: null
      })
    );
};

// Create Budget
export const createBudget = (budgetData, history) => dispatch => {
  axios
    .post("/api/budget", budgetData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add budget
export const addBudgetItem = (budgetData, history) => dispatch => {
  axios
    .post("/api/budget/data", budgetData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete delete budget item
export const deleteBudgetItem = id => dispatch => {
  swal({
    title: "Are you sure?",
    text: "This Item will be deleted!",
    icon: "info",
    buttons: ["No", "Yes"],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      swal("deleted!", {
        icon: "success"
      });
      // Delete edu
      axios
        .delete(`/api/budget/data/${id}`)
        .then(res =>
          dispatch({
            type: GET_BUDGET,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  });
};

// Delete budget profile
export const deleteBudget = () => dispatch => {
  swal({
    title: "Are you sure?",
    text:
      "Once deleted, you will not be able to recover this account and budget",
    icon: "warning",
    buttons: ["Cancel", "yes im sure"],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      swal("Your account and budget has been deleted!", {
        icon: "success"
      });
      // Delete Budget
      axios
        .delete("/api/budget")
        .then(res =>
          dispatch({
            type: GET_BUDGET,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    } else {
      swal("Your budget is safe!");
    }
  });
};

// Delete account & budget profile
export const deleteAccount = () => dispatch => {
  swal({
    title: "Are you sure?",
    text:
      "Once deleted, you will not be able to recover this account and budget",
    icon: "warning",
    buttons: ["Cancel", "yes im sure"],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      swal("Your account and budget has been deleted!", {
        icon: "success"
      });
      // Delete Budget
      axios
        .delete("/api/budget")
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    } else {
      swal("Your budget is safe!");
    }
  });
};

// Profile loading
export const setBudgetLoading = () => {
  return {
    type: BUDGET_LOADING
  };
};

// Clear profile
export const clearCurrentBudget = () => {
  return {
    type: CLEAR_CURRENT_BUDGET
  };
};
