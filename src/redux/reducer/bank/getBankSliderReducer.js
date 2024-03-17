import {
  GET_BANK_SLIDER,
  GET_BANK_SLIDER_SUCCESS,
  GET_BANK_SLIDER_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  bankSlider: null,
};

const getBankSliderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BANK_SLIDER:
      return { ...state, loading: true };
    case GET_BANK_SLIDER_SUCCESS:
      return {
        ...state,
        bankSlider: action.payload,
        loading: false,
      };
    case GET_BANK_SLIDER_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getBankSliderReducer;
