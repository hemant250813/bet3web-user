import {
  SETTING, SETTING_SUCCESS, SETTING_FAILURE 
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const settingReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SETTING:
      return { ...state, loading: true };
    case SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SETTING_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default settingReducer;
