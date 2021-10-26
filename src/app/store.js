import { configureStore } from "@reduxjs/toolkit";
import valueSetterReducer from "../features/valueSetter/valueSetterSlice";

export const store = configureStore({
  reducer: { values: valueSetterReducer },
});
