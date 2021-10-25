import {
  ADD_PANEL_DATA,
  ADD_PREFERENCE,
  GET_ITEMS_ERROR,
  GET_ITEMS_REQUESTED,
  GET_ITEMS_SUCCESS,
  LOGIN,
} from "./actionType";

const INITIAL_STATE = {
  number: "",
  loginStatus: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        number: action.payload,
        loginStatus: true,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: true,
  data: [],
  error: "",
};

export const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUESTED:
      return state;
    case GET_ITEMS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case GET_ITEMS_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const preferenceState = {
  id: "",
  data: [],
  title: "",
};

export const panelDataReducer = (state = preferenceState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PANEL_DATA:
      return { ...payload };
    default:
      return state;
  }
};

export const userOderPreference = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PREFERENCE:
      let obj = state.find((obj) => obj.id === payload.id);
      if (!obj) {
        return [...state, { id: payload.id, [payload.title]: payload.value }];
      }
      let nextState = state.map((stateObj) => {
        if (stateObj === obj) {
          stateObj[payload.title] = payload.value;
        }
        return stateObj;
      });
      return nextState;
    default:
      return state;
  }
};
