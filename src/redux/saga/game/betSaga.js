import { all, call, put, takeEvery } from "redux-saga/effects";
import { BET } from "../../action/types";
import { betSuccess, betFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  setLocalStorageItem,
} from "../../../utils/helper";

function* betRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/bet-placed",
      action?.payload?.payload
    );

    if (data.meta.code === 200) {
      yield put(betSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data.meta.code === 401) {
      localStorage.clear();
      window.location.href = "/";
      notifyWarning(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield put(betFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(betFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchBetAPI() {
  yield takeEvery(BET, betRequest);
}

export default function* rootSaga() {
  yield all([watchBetAPI()]);
}
