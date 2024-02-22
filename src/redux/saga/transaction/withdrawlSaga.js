import { all, call, put, takeEvery } from "redux-saga/effects";
import { WITHDRAW } from "../../action/types";
import { withdrawSuccess, withdrawFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* withdrawRequest(action) {
  try {

    const { data } = yield API.post(
      "admin/transaction",
      action?.payload?.formPayload
    );
   
    if (data?.meta?.code === 200) {
      yield put(withdrawSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(withdrawFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(withdrawFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchWithdrawlAPI() {
  yield takeEvery(WITHDRAW, withdrawRequest);
}

export default function* rootSaga() {
  yield all([watchWithdrawlAPI()]);
}
