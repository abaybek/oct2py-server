import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth, * as fromAuth from './auth.js';
import echo, * as fromEcho from './echo.js';
import script, * as fromScript from './script';
import script_job, * as fromScriptJob from './script_job';

export default combineReducers({
  auth: auth,
  echo: echo,
  script: script,
  script_job: script_job,
  router: routerReducer
})

export const isAuthenticated =
 state => fromAuth.isAuthenticated(state.auth)
export const accessToken = 
  state => fromAuth.accessToken(state.auth)
export const refreshToken =
  state => fromAuth.refreshToken(state.auth)
export const authErrors =
  state => fromAuth.errors(state.auth)
export const serverMessage = state => fromEcho.serverMessage(state.echo)
export const getWorkId = state => fromScript.getWorkId(state.script)
export const getWorkResults = state => fromScriptJob.getWorkResults(state.script_job)


export function withAuth(headers={}){
  return (state) => ({
    ...headers,
    'Authorization': `JWT ${accessToken(state)}`
  })
}