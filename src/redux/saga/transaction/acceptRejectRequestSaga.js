import { all, call, put, takeEvery } from "redux-saga/effects";
import { ACCEPT_REJECT_REQUEST } from "../../action/types";
import {
  acceptRejectRequestSuccess,
  acceptRejectRequestFailure,
} from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* acceptRejectRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/accept-reject-request",
      action?.payload?.data
    );

    if (data?.meta?.code === 200) {
      yield put(acceptRejectRequestSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(acceptRejectRequestFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(acceptRejectRequestFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchAcceptRejectRequestAPI() {
  yield takeEvery(ACCEPT_REJECT_REQUEST, acceptRejectRequest);
}

export default function* rootSaga() {
  yield all([watchAcceptRejectRequestAPI()]);
}
