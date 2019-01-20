import * as actions from "../constants/action-types";

const initialState = {
    booklist: [],
    bookresults: [],
    loggedIn: false,
    loading: false,
    error: null,
    isFetching: false,
    isAuthenticated: false,
    user: null
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

    if (action.type === actions.LOGIN_REQUEST) {
        return Object.assign({}, state, {
            ...state,
            loggedIn: false,
            isFetching: true,
            isAuthenticated: false,
            user: action.creds
        });
    }
    if (action.type === actions.LOGIN_SUCCESS) {
        return Object.assign({}, state, {
            ...state,
            loggedIn: true,
            isFetching: false,
            isAuthenticated: true,
            errorMessage: ''
        });
    }
    if (action.type === actions.LOGIN_FAILURE) {
        return Object.assign({}, state, {
            ...state,
            loggedIn: false,
            isFetching: false,
            isAuthenticated: false,
            errorMessage: action.message
        });
    }
    if (action.type === actions.LOGOUT_SUCCESS) {
        return Object.assign({}, state, {
            ...state,
            loggedIn: false,
            isFetching: true,
            isAuthenticated: false
        });
    }

    return state;
  }

export default rootReducer;