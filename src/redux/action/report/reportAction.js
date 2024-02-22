import { GET_REPORT, GET_REPORT_SUCCESS, GET_REPORT_FAILURE } from "../types";

export const getReport = (payload) => ({
  type: GET_REPORT,
  payload,
});

export const getReportSuccess = (payload) => ({
  type: GET_REPORT_SUCCESS,
  payload,
});

export const getReportFailure = () => ({
  type: GET_REPORT_FAILURE,
});
