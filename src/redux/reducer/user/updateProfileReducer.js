import {
  UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const updateProfileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default updateProfileReducer;
