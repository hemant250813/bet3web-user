import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE } from "../types";

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const getUserSuccess = (payload) => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserFailure = () => ({
  type: GET_USER_FAILURE,
});
