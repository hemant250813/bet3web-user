import {
  DELETE_BANK_SLIDER,
  DELETE_BANK_SLIDER_SUCCESS,
  DELETE_BANK_SLIDER_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const deleteBankSliderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DELETE_BANK_SLIDER:
      return { ...state, loading: true };
    case DELETE_BANK_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_BANK_SLIDER_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default deleteBankSliderReducer;
