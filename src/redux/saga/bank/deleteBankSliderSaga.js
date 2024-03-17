import { all, call, put, takeEvery } from "redux-saga/effects";
import { DELETE_BANK_SLIDER } from "../../action/types";
import { deleteBankSliderSuccess, deleteBankSliderFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* deleteBankSliderRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/delete-bank-slider",
      action?.payload?.form
    );

    if (data?.meta?.code === 200) {
      yield put(deleteBankSliderSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data?.code === 400) {
      yield put(deleteBankSliderFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(deleteBankSliderFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchDeleteBankSliderAPI() {
  yield takeEvery(DELETE_BANK_SLIDER, deleteBankSliderRequest);
}

export default function* rootSaga() {
  yield all([watchDeleteBankSliderAPI()]);
}
