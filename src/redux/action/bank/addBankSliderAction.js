import { ADD_BAN_SLIDER, ADD_BAN_SLIDER_SUCCESS, ADD_BAN_SLIDER_FAILURE } from "../types";

export const addBankSlider = (payload) => ({
  type: ADD_BAN_SLIDER,
  payload,
});

export const addBankSliderSuccess = (payload) => ({
  type: ADD_BAN_SLIDER_SUCCESS,
  payload,
});

export const addBankSliderFailure = () => ({
  type: ADD_BAN_SLIDER_FAILURE,
});
