import { call, put, takeEvery } from "redux-saga/effects";
import { getUnitsSuccess } from "./units-state";

// http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=3839dbe5a56def39bb3176afda3ffdbb&format=json

function* workGetUnitsFetch() {
  const units = yield call(() => fetch("age-of-empires-units.json"));
  const formattedUnits = yield units.json();
  yield put(getUnitsSuccess(formattedUnits));
}

function* unitsSaga() {
  yield takeEvery("units/getUnitsFetch", workGetUnitsFetch);
}

export default unitsSaga;
