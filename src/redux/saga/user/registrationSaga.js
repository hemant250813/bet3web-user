import { all, call, put, takeEvery } from "redux-saga/effects";
import { REGISTRATION } from "../../action/types";
import { registrationSuccess, registrationFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* registrationRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/registration",
      action?.payload?.formPayload
    );
   
    if (data?.meta?.code === 200) {
      yield put(registrationSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.meta?.code === 400) {
      yield put(registrationFailure(data));
      notifyWarning(data?.meta?.message);
    }
  } catch (error) {
    yield put(registrationFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchRegistrationAPI() {
  yield takeEvery(REGISTRATION, registrationRequest);
}

export default function* rootSaga() {
  yield all([watchRegistrationAPI()]);
}
