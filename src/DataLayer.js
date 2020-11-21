import React, { createContext, useContext, useReducer } from "react";
import reducer from "./Reducer";
// import { saveToCart } from "./Reducer";

const initialState = {
  patients: [],
  exams: [],
};

//Prepares the data layer
export const StateContext = createContext();

//Wrap our app and provide the Data Layer
export const DataLayer = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
