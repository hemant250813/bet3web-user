import { DELETE_BANK_SLIDER, DELETE_BANK_SLIDER_SUCCESS, DELETE_BANK_SLIDER_FAILURE } from "../types";

export const deleteBankSlider = (payload) => ({
  type: DELETE_BANK_SLIDER,
  payload,
});

export const deleteBankSliderSuccess = (payload) => ({
  type: DELETE_BANK_SLIDER_SUCCESS,
  payload,
});

export const deleteBankSliderFailure = () => ({
  type: DELETE_BANK_SLIDER_FAILURE,
});
