import { UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from "../types";

export const updateProfile = (payload) => ({
  type: UPDATE_PROFILE,
  payload,
});

export const updateProfileSuccess = (payload) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileFailure = () => ({
  type: UPDATE_PROFILE_FAILURE,
});
