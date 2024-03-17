import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_BANK } from "../../action/types";
import { getBankSuccess, getBankFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getBankRequest() {
  try {
    const { data } = yield API.get(`/api/v1/bank`);
    
    if (data.meta.code === 200) {
      yield put(getBankSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getBankFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getBankFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetBankAPI() {
  yield takeEvery(GET_BANK, getBankRequest);
}

export default function* rootSaga() {
  yield all([watchGetBankAPI()]);
}
