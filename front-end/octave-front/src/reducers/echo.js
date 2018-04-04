import * as echo from '../actions/echo';

const initialState = {
  message: ""
}

export default (state=initialState, action) => {
  switch(action.type) {
    case echo.ECHO_SUCCESS:
      return {
        message: action.payload.results
      }
    default:
      return state
  }
}
export const serverMessage = (state) => state.message
