import { all, call, put, takeEvery } from "redux-saga/effects";
import { RESET_PASSWORD } from "../../action/types";
import { resetPasswordSuccess, resetPasswordFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* resetPasswordRequest(action) {
  console.log("resetPasswordRequest action");
  try {
    const { data } = yield API.post(
      "/api/v1/reset_password",
      action?.payload?.payload  
    );
    console.log("resetPasswordRequest",data);
    if (data?.meta?.code === 200) {
      yield put(resetPasswordSuccess(data));
      notifySuccess(data?.meta?.message);
      yield call(action.payload.callback, data);  
    } else if (data?.meta?.code === 400) {
      yield put(resetPasswordFailure(data));
      notifyWarning(data.meta.message);
      yield call(action.payload.callback, data);  
    }else{
      yield put(resetPasswordFailure(data));
      notifyWarning(data.meta.message);
      yield call(action.payload.callback, data);  
    }
  } catch (error) {
    yield put(resetPasswordFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchResetPasswordAPI() {
  yield takeEvery(RESET_PASSWORD, resetPasswordRequest);
}

export default function* rootSaga() {
  yield all([watchResetPasswordAPI()]);
}
