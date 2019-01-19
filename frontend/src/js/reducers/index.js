import * as actions from "../constants/action-types";

const initialState = {
    booklist: [],
    bookresults: [],
    loggedIn: false,
    loading: false,
    error: null
};

function rootReducer(state = initialState, action) {

    if (action.type === actions.FETCH_BOOKS) {
        return Object.assign({}, state, {
            ...state,
            bookresults: action.payload
            // bookresults: state.bookresults.concat(action.payload)
        });
    }

    if (action.type === actions.FETCH_BOOKLIST) {
        return Object.assign({}, state, {
            ...state,
            booklist: action.payload
            // booklist: state.booklist.concat(action.payload)
        });
    }

    // if (action.type === actions.ADD_BOOK) {
    //     return Object.assign({}, state, {
    //         ...state,
    //         // bookresults: action.payload
    //         booklist: state.booklist.concat(action.payload)
    //     });
    // }

    return state;
  }

export default rootReducer;