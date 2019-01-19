import * as actions from "../constants/action-types";

export function fetchBooks(payload) {
    return { type: actions.FETCH_BOOKS, payload }
}

export function fetchBooklist(payload) {
    return { type: actions.FETCH_BOOKLIST, payload }
}

// export function addBook(payload) {
//     return { type: actions.ADD_BOOK, payload }
// }