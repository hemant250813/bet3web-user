import {
  GET_BANK_SLIDER,
  GET_BANK_SLIDER_SUCCESS,
  GET_BANK_SLIDER_FAILURE,
} from "../types";

export const getBankSlider = (payload) => ({
  type: GET_BANK_SLIDER,
  payload,
});

export const getBankSliderSuccess = (payload) => ({
  type: GET_BANK_SLIDER_SUCCESS,
  payload,
});

export const getBankSliderFailure = () => ({
  type: GET_BANK_SLIDER_FAILURE,
});
