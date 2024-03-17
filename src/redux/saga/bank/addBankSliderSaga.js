import { all, call, put, takeEvery } from "redux-saga/effects";
import { ADD_BAN_SLIDER } from "../../action/types";
import { addBankSliderSuccess, addBankSliderFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* addbankSliderRequest(action) {
  try {
    console.log("addbankSliderRequest", action);
    const { data } = yield API.post("admin/bank-slider", action?.payload?.data);

    if (data?.meta?.code === 200) {
      yield put(addBankSliderSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      yield put(addBankSliderFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(addBankSliderFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchAddBankSliderAPI() {
  yield takeEvery(ADD_BAN_SLIDER, addbankSliderRequest);
}

export default function* rootSaga() {
  yield all([watchAddBankSliderAPI()]);
}
