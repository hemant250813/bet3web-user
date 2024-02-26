import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_RESULT } from "../../action/types";
import { getResultSuccess, getResultFailure } from "../../action";
import API from "../../../utils/api";
import { notifyWarning } from "../../../utils/helper";

function* getResultRequest(action) {
  try {
    const { search } = action?.payload;
    const { data } = yield API.get(`admin/get-result?search=${search}`);
    if (data.meta.code === 200) {
      yield put(getResultSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getResultFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getResultFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetResultAPI() {
  yield takeEvery(GET_RESULT, getResultRequest);
}

export default function* rootSaga() {
  yield all([watchGetResultAPI()]);
}
