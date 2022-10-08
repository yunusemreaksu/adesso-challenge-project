import { call, put, takeEvery } from "redux-saga/effects";
import { getUnitsSuccess } from "./units-state";

function* workGetUnitsFetch() {
  const units = yield call(() => fetch("age-of-empires-units.json"));
  const formattedUnits = yield units.json();
  yield put(getUnitsSuccess(formattedUnits));
}

function* unitsSaga() {
  yield takeEvery("units/getUnitsFetch", workGetUnitsFetch);
}

export default unitsSaga;
