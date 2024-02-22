import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_REPORT } from "../../action/types";
import { getReportSuccess, getReportFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* reportRequest(action) {
  try {
    const { deposit, withdrawl, win, lose, game, game_name, userId } =
      action?.payload?.query;
    const { data } = yield API.get(
      `admin/get-report?deposit=${deposit}&withdrawl=${withdrawl}&win=${win}&lose=${lose}&game=${game}&game_name=${game_name}&userId=${userId}`
    );
    if (data?.meta?.code === 200) {
      yield put(getReportSuccess(data));
    } else if (data?.code === 400) {
      yield put(getReportFailure(data));
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(getReportFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchReportAPI() {
  yield takeEvery(GET_REPORT, reportRequest);
}

export default function* rootSaga() {
  yield all([watchReportAPI()]);
}
