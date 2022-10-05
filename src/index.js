import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import "./index.css";
import App from "./App";
import Units from "./components/Units/Units";
import UnitDetails from "./components/UnitDetails/UnitDetails";
import unitsReducer from "./state/units-state";
import unitsSaga from "./state/units-saga";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    units: unitsReducer,
  },
  middleware: [saga],
});
saga.run(unitsSaga);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "units",
    element: <Units />,
  },
  {
    path: "unitdetails/:id",
    element: <UnitDetails />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
