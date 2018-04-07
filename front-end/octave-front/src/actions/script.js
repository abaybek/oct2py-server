import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';
export const SCRIPT_REQUEST = '@@script/SCRIPT_REQUEST';
export const SCRIPT_SUCCESS = '@@script/SCRIPT_SUCCESS';
export const SCRIPT_FAILURE = '@@script/SCRIPT_FAILURE';

export const script = (_id, ivals) => ({
  [RSAA]: {
      endpoint: '/api/v1/scripts/' + _id + '/',
      method: 'POST',
      body: JSON.stringify({ivals: ivals}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        SCRIPT_REQUEST, SCRIPT_SUCCESS, SCRIPT_FAILURE
      ]
  }
})

