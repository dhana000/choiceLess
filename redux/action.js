import {
  LOGIN,
  GET_ITEMS_REQUESTED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  ADD_PANEL_DATA,
  ADD_PREFERENCE,
} from "./actionType";

import * as firebase from "firebase";

const db = firebase.firestore();

export const login = (number) => {
  return {
    type: LOGIN,
    payload: number,
  };
};

const getItemsRequest = () => {
  return {
    type: GET_ITEMS_REQUESTED,
  };
};

const getItemsSucess = (data) => {
  return {
    type: GET_ITEMS_SUCCESS,
    payload: data,
  };
};

const getItemsError = (err) => {
  return {
    type: GET_ITEMS_ERROR,
    payload: err,
  };
};

export const getItems = (selectedItems) => {
  return async (dispatch) => {
    let docRef = db.collection("items").doc("list");
    dispatch(getItemsRequest());
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc
            .data()
            .data.filter((obj) => selectedItems.includes(parseInt(obj.id)));
          dispatch(getItemsSucess(data));
        } else {
          dispatch(getItemsError("No such document!"));
        }
      })
      .catch((error) => {
        dispatch(getItemsError("Error getting document: ", error));
      });
  };
};

export const addPanelData = (data) => {
  return {
    type: ADD_PANEL_DATA,
    payload: data,
  };
};

export const addPrefrence = (data) => {
  return {
    type: ADD_PREFERENCE,
    payload: data,
  };
};
