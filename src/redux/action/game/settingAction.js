import { SETTING, SETTING_SUCCESS, SETTING_FAILURE } from "../types";

export const setting = (payload) => ({
  type: SETTING,
  payload,
});

export const settingSuccess = (payload) => ({
  type: SETTING_SUCCESS,
  payload,
});

export const settingFailure = () => ({
  type: SETTING_FAILURE,
});
