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
export const getBudgetByHandle = handle => dispatch => {
  dispatch(setBudgetLoading());
  axios
    .get(`/api/budget/handle/${handle}`)
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
export const addBudget = (budgetData, history) => dispatch => {
  axios
    .post("/api/budget/budget", budgetData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteBudget = id => dispatch => {
  swal({
    title: "Are you sure?",
    text: "Your education will be deleted!",
    icon: "info",
    buttons: ["No", "Yes"],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      swal("Your education has been deleted!", {
        icon: "success"
      });
      // Delete edu
      axios
        .delete(`/api/profile/education/${id}`)
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

// Delete account & profile
export const deleteAccount = () => dispatch => {
  swal({
    title: "Are you sure?",
    text:
      "Once deleted, you will not be able to recover this account and profile",
    icon: "warning",
    buttons: ["Cancel", "yes im sure"],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      swal("Your account and profile file has been deleted!", {
        icon: "success"
      });
      // Delete Profile
      axios
        .delete("/api/profile")
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
      swal("Your account is safe!");
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
