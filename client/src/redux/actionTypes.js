// This file contains all the actions Redux will handle.

/*
 * These actions handle logging in and receiving
 * authentication data such as the JSON web token.
 */
export const REQUEST_AUTH = "REQUEST_AUTH";
export const RECEIVE_AUTH = "RECEIVE_AUTH";
export const ERROR_AUTH = "ERROR_AUTH";
// Handle logout.
export const LOGOUT = "LOGOUT";

/*
 * These actions handle GET requests to api/items
 */

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_RECEIVE = "GET_ITEMS_RECEIVE";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";
