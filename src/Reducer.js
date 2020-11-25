import { collectIdsAndDocs } from "./utilities";

export const types = {
  SET_USER: "SET_USER",
  GET_PATIENTS: "GET_PATIENTS",
  GET_EXAMS: "GET_EXAMS",
};

const reducer = (state, action) => {
  console.log("action is:", action);
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.GET_PATIENTS:
      return {
        ...state,
        patients: action.payload.map((doc) => collectIdsAndDocs(doc)),
      };

    case types.GET_EXAMS:
      return {
        ...state,
        exams: action.payload.map((doc) => collectIdsAndDocs(doc)),
      };
    default:
      return state;
  }
};

export default reducer;
