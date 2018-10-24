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
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
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

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
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

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  swal({
    title: "Are you sure?",
    text: "Your experience will be deleted!",
    icon: "info",
    buttons: ["No", "Yes"],
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      swal("Your experience has been deleted!", {
        icon: "success"
      });
      // Delete exp
      axios
        .delete(`/api/profile/experience/${id}`)
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

// Delete Education
export const deleteEducation = id => dispatch => {
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
export const setProfileLoading = () => {
  return {
    type: BUDGET_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_BUDGET
  };
};
