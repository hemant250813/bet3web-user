import {
  GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  setting: null,
};

const settingReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SETTING:
      return { ...state, loading: true };
    case GET_SETTING_SUCCESS:
      return {
        ...state,
        setting: action.payload,
        loading: false,
      };
    case GET_SETTING_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default settingReducer;
