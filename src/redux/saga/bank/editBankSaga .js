import { all, call, put, takeEvery } from "redux-saga/effects";
import { EDIT_BANK } from "../../action/types";
import { editBankSuccess, editBankFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* editbankRequest(action) {
  try {
    const { data } = yield API.post("/api/v1/edit-bank", action?.payload?.data);

    if (data?.meta?.code === 200) {
      yield put(editBankSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data?.code === 400) {
      yield put(editBankFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(editBankFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchEditBankAPI() {
  yield takeEvery(EDIT_BANK, editbankRequest);
}

export default function* rootSaga() {
  yield all([watchEditBankAPI()]);
}
