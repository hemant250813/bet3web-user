import {
  GET_REPORT,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  report:null
};

const reportReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REPORT:
      return { ...state, loading: true };
    case GET_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        loading: false,
      };
    case GET_REPORT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reportReducer;
