import { REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from "../types";

export const registration = (payload) => ({
  type: REGISTRATION,
  payload,
});

export const registrationSuccess = (payload) => ({
  type: REGISTRATION_SUCCESS,
  payload,
});

export const registrationFailure = () => ({
  type: REGISTRATION_FAILURE,
});
