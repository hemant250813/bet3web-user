import { ACCEPT_REJECT_REQUEST, ACCEPT_REJECT_REQUEST_SUCCESS, ACCEPT_REJECT_REQUEST_FAILURE } from "../types";

export const acceptRejectRequest = (payload) => ({
  type: ACCEPT_REJECT_REQUEST,
  payload,
});

export const acceptRejectRequestSuccess = (payload) => ({
  type: ACCEPT_REJECT_REQUEST_SUCCESS,
  payload,
});

export const acceptRejectRequestFailure = () => ({
  type: ACCEPT_REJECT_REQUEST_FAILURE,
});
