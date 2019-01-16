import { ADD_BOOK } from "../constants/action-types";

const initialState = {
    books: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_BOOK) {
      return Object.assign({}, state, {
        books: state.books.concat(action.payload)
      });
    }
    return state;
  }

export default rootReducer;