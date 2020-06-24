import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_RECEIVE,
  GET_ITEMS_ERROR
} from "../actionTypes";

// Actions to handle items.

const getItemsRequest = () => {
  return { type: GET_ITEMS_REQUEST, isFetching: true, error: null };
};

const getItemsReceive = response => {
  return {
    type: GET_ITEMS_RECEIVE,
    isFetching: false,
    error: null
  };
};

const getItemsError = error => {
  return {
    type: GET_ITEMS_ERROR,
    isFetching: false,
    error: error.toString()
  };
};
