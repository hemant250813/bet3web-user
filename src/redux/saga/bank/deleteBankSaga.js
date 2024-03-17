import { all, call, put, takeEvery } from "redux-saga/effects";
import { DELETE_BANK } from "../../action/types";
import { deleteBankSuccess, deleteBankFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* deleteBankRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/delete-bank",
      action?.payload?.form
    );

    if (data?.meta?.code === 200) {
      yield put(deleteBankSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data?.code === 400) {
      yield put(deleteBankFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(deleteBankFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchDeleteBankAPI() {
  yield takeEvery(DELETE_BANK, deleteBankRequest);
}

export default function* rootSaga() {
  yield all([watchDeleteBankAPI()]);
}
