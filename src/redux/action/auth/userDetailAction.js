import { USER_DETAIL, USER_DETAIL_SUCCESS, USER_DETAIL_FAILURE } from "../types";

export const userDetail = (payload) => ({
  type: USER_DETAIL,
  payload,
});

export const userDetailSuccess = (payload) => ({
  type: USER_DETAIL_SUCCESS,
  payload,
});

export const userDetailFailure = () => ({
  type: USER_DETAIL_FAILURE,
});
