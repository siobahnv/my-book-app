import { ADD_BOOK } from "../constants/action-types";

export function addBook(payload) {
    return { type: ADD_BOOK, payload }
  };