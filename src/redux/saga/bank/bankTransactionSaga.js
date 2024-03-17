import { all, call, put, takeEvery } from "redux-saga/effects";
import { BANK_TRANSACTION } from "../../action/types";
import { bankTransactionSuccess, bankTransactionFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* bankTransactionRequest(action) {
  console.log("bankDepositRequest",action);
  try {
    const { data } = yield API.post(
      "/api/v1/bank-transaction",
      action?.payload?.data
    );

    if (data?.meta?.code === 200) {
      yield put(bankTransactionSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(bankTransactionFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(bankTransactionFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchBankTransactionAPI() {
  yield takeEvery(BANK_TRANSACTION, bankTransactionRequest);
}

export default function* rootSaga() {
  yield all([watchBankTransactionAPI()]);
}
