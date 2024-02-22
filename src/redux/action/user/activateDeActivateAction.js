import { USER_STATUS, USER_STATUS_SUCCESS, USER_STATUS_FAILURE } from "../types";

export const userStatus = (payload) => ({
  type: USER_STATUS,
  payload,
});

export const userStatusSuccess = (payload) => ({
  type: USER_STATUS_SUCCESS,
  payload,
});

export const userStatusFailure = () => ({
  type: USER_STATUS_FAILURE,
});
