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

// export function requestLogin(creds) {
//     return {
//       type: actions.LOGIN_REQUEST,
//       isFetching: true,
//       isAuthenticated: false,
//       creds
//     }
//   }
  
// export function receiveLogin(user) {
//     return {
//       type: actions.LOGIN_SUCCESS,
//       isFetching: false,
//       isAuthenticated: true,
//       id_token: user.id_token
//     }
//   }
  
// export function loginError(message) {
//     return {
//       type: actions.LOGIN_FAILURE,
//       isFetching: false,
//       isAuthenticated: false,
//       message
//     }
//   }

export function loginUser(creds) {
    return {
        type: actions.LOGIN_SUCCESS,
        loggedIn: true,
        creds
    }
}


// export function requestLogout() {
//     return {
//       type: actions.LOGOUT_REQUEST,
//       isFetching: true,
//       isAuthenticated: true,
//       loggedIn: true
//     }
//   }
  
// export function receiveLogout() {
//     return {
//       type: actions.LOGOUT_SUCCESS,
//       isFetching: false,
//       isAuthenticated: false,
//       loggedIn: false
//     }
//   }
    
export function logoutUser() {
    return {
        type: actions.LOGOUT_SUCCESS,
        loggedIn: false
      }
  }