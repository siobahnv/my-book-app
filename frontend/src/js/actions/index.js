import * as actions from "../constants/action-types";

export function fetchBooks(payload) {
    return { type: actions.FETCH_BOOKS, payload }
}

export function fetchBooklist(payload) {
    return { type: actions.FETCH_BOOKLIST, payload }
}