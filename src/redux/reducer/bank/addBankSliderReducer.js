import {
  ADD_BAN_SLIDER,
  ADD_BAN_SLIDER_SUCCESS,
  ADD_BAN_SLIDER_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const addBankSliderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_BAN_SLIDER:
      return { ...state, loading: true };
    case ADD_BAN_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_BAN_SLIDER_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default addBankSliderReducer;
