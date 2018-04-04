import * as script_job from '../actions/script_job';

const initialState = {
  work_id: '',
  state: '',
  message: '',
  image_exist: '',
  image_path: ''
}

function script_jobD(state=initialState, action){
    switch(action.type) {
      case script_job.SCRIPTJOB_SUCCESS:
        console.log('true values');
        console.log(action.payload);
        if (action.payload.job_state === 'SUCCESS'){
            return {
                work_id: action.payload.task_id,
                state: action.payload.job_state,
                message: action.payload.job_result.message || "",
                image_exist: action.payload.job_result.image_exist || "",
                image_path: action.payload.job_result.image_path || ""
            }
        }else {
            return {
                work_id: '',
                state: action.payload.job_state,
                message: '',
                image_exist: '',
                image_path: ''
            }
        }
      case script_job.SCRIPTJOB_CLEANING:
        return {
            work_id: '',
            state: '',
            message: '',
            image_exist: '',
            image_path: ''
        }
      default:
        return state
    }
  }

export default script_jobD
export const getWorkResults = (state, action) => state
