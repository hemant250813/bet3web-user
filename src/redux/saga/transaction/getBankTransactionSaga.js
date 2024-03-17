import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_BANK_TRANSACTION } from "../../action/types";
import {
  getBankTransactionSuccess,
  getBankTransactionFailure,
} from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getBankTransactionRequest(action) {
  console.log("bankDepositRequest", action);
  try {
    const { data } = yield API.get("admin/bank-transaction");

    if (data?.meta?.code === 200) {
      yield put(getBankTransactionSuccess(data?.data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(getBankTransactionFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(getBankTransactionFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetBankTransactionAPI() {
  yield takeEvery(GET_BANK_TRANSACTION, getBankTransactionRequest);
}

export default function* rootSaga() {
  yield all([watchGetBankTransactionAPI()]);
}
