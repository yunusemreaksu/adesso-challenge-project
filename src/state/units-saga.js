import { call, put, all, takeLatest } from "redux-saga/effects";
import { getUnitsSuccess, getUnitByIdSuccess } from "./units-state";

const fetchUnitsData = async () => {
  const response = await fetch("/age-of-empires-units.json");
  return response.json();
};

function* workerGetUnits() {
  const response = yield call(fetchUnitsData);
  yield put(getUnitsSuccess(response));
}

function* workerGetUnitById(action) {
  const response = yield call(fetchUnitsData);
  yield put(getUnitByIdSuccess({ response, id: action.payload }));
}

function* unitsSaga() {
  yield all([
    takeLatest("units/getUnitsFetch", workerGetUnits),
    takeLatest("units/getUnitById", workerGetUnitById),
  ]);
}

export default unitsSaga;
