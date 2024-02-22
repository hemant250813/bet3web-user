import { all, call, put, takeEvery } from "redux-saga/effects";
import { DEPOSIT } from "../../action/types";
import { depositSuccess, depositFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* depositRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/transaction",
      action?.payload?.formPayload
    );
  
    if (data?.meta?.code === 200) {
      yield put(depositSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(depositFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(depositFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchDepositAPI() {
  yield takeEvery(DEPOSIT, depositRequest);
}

export default function* rootSaga() {
  yield all([watchDepositAPI()]);
}
