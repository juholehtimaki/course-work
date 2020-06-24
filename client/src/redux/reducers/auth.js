import { REQUEST_AUTH, RECEIVE_AUTH, ERROR_AUTH, LOGOUT } from "../actionTypes";

const initialState = {
  token: null,
  role: null,
  id: null,
  isFetching: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error
      };
    case RECEIVE_AUTH:
      return {
        token: action.token,
        role: action.role,
        id: action.id,
        isFetching: action.isFetching,
        error: null
      };
    case ERROR_AUTH:
      return Object.assign({}, initialState, {
        error: action.error.toString()
      });
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
