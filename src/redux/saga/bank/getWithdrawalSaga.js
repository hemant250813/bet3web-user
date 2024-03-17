import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_WITHDRAWAL } from "../../action/types";
import { getWithdrawalSuccess, getWithdrawalFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getWithdrawalRequest(action) {
  try {
    const { data } = yield API.get(`/api/v1/withdrawal`);

    if (data.meta.code === 200) {
      yield put(getWithdrawalSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getWithdrawalFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getWithdrawalFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetWithdrawalAPI() {
  yield takeEvery(GET_WITHDRAWAL, getWithdrawalRequest);
}

export default function* rootSaga() {
  yield all([watchGetWithdrawalAPI()]);
}
