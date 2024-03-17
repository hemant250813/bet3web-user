import { all, call, put, takeEvery } from "redux-saga/effects";
import { ADD_BANK } from "../../action/types";
import { addBankSuccess, addBankFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* addbankRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/add-bank",
      action?.payload?.data
    );

    if (data?.meta?.code === 200) {
      yield put(addBankSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data?.code === 400) {
      yield put(addBankFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(addBankFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchAddBankAPI() {
  yield takeEvery(ADD_BANK, addbankRequest);
}

export default function* rootSaga() {
  yield all([watchAddBankAPI()]);
}
