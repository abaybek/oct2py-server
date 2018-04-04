import * as script from '../actions/script';

const initialState = {
  work_id     : ''
}

export default (state=initialState, action) => {
  switch(action.type) {
    case script.SCRIPT_SUCCESS:
      return {
        work_id: action.payload
      }
    default:
      return state
  }
}
export const getWorkId = (state) => state.work_id
