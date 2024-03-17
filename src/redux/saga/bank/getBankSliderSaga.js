import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_BANK_SLIDER } from "../../action/types";
import { getBankSliderSuccess, getBankSliderFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getBankSliderRequest() {
  try {
    const { data } = yield API.get(`admin/bank-slider`);

    if (data.meta.code === 200) {
      yield put(getBankSliderSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getBankSliderFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getBankSliderFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetBankSliderAPI() {
  yield takeEvery(GET_BANK_SLIDER, getBankSliderRequest);
}

export default function* rootSaga() {
  yield all([watchGetBankSliderAPI()]);
}
