import { createSlice } from "@reduxjs/toolkit";

export const unitsSlice = createSlice({
  name: "units",
  initialState: {
    units: [],
    unitDetails: {},
    isLoading: false,
  },
  reducers: {
    getUnitsFetch: (state) => {
      state.isLoading = true;
    },
    getUnitsSuccess: (state, action) => {
      state.units = action.payload;
      state.isLoading = false;
    },
    getUnitsFailure: (state) => {
      state.isLoading = false;
    },
    getUnitById: (state) => {
      state.isLoading = true;
    },
    getUnitByIdSuccess: (state, action) => {
      const { id, response } = action.payload;
      state.unitDetails = response.units
        ? response.units.find((u) => u.id + "" === id)
        : {};
      state.isLoading = false;
    },
    getUnitByIdFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getUnitsFetch,
  getUnitsSuccess,
  getUnitsFailure,
  getUnitById,
  getUnitByIdSuccess,
  getUnitByIdFailure,
} = unitsSlice.actions;

export default unitsSlice.reducer;
