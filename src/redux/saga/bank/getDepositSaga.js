import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_DEPOSIT } from "../../action/types";
import { getDepositSuccess, getDepositFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getDepositRequest(action) {
  try {
    console.log("getDepositRequest");
    const { data } = yield API.get(`/api/v1/deposit`);
    
    if (data.meta.code === 200) {
      yield put(getDepositSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getDepositFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getDepositFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetDepositAPI() {
  yield takeEvery(GET_DEPOSIT, getDepositRequest);
}

export default function* rootSaga() {
  yield all([watchGetDepositAPI()]);
}
