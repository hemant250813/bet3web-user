import { GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_FAILURE } from "../types";

export const getSetting = (payload) => ({
  type: GET_SETTING,
  payload,
});

export const getSettingSuccess = (payload) => ({
  type: GET_SETTING_SUCCESS,
  payload,
});

export const getSettingFailure = () => ({
  type: GET_SETTING_FAILURE,
});
