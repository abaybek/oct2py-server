import jwtDecode from 'jwt-decode';
import * as auth from '../actions/auth';

const initialState = {
  token: undefined,
  error: {}
}

export function accessToken(state) {
  if (state.token) {
      return  state.token.token
  }
}

export function refreshToken(state) {
  if (state.token) {
      return  state.token
  }
}

export function isAuthenticated(state) {
  if (state.token !== undefined){
    return true
  }else{
    return false
  }
}

export function errors(state) {
  return  state.errors
}

export default (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS');
      console.log(state);
      console.log(action);
      return {
        token: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },
        errors: {}
      }
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        token: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        }
      }
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
        token: undefined,
        errors: action.payload.response || {
          'non_field_errors': action.payload.statusText
        },
      }
    default:
      return state
  }
}