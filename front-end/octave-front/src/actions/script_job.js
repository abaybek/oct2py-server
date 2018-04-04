import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';
export const SCRIPTJOB_REQUEST  = '@@scriptjob/SCRIPTJOB_REQUEST';
export const SCRIPTJOB_SUCCESS  = '@@scriptjob/SCRIPTJOB_SUCCESS';
export const SCRIPTJOB_FAILURE  = '@@scriptjob/SCRIPTJOB_FAILURE';
export const SCRIPTJOB_CLEANING = '@@scriptjob/SCRIPTJOB_CLEANING';

export const script_job = (job) => ({
    [RSAA]: {
        endpoint: '/api/v1/scripts/result/?job='+job,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            SCRIPTJOB_REQUEST, SCRIPTJOB_SUCCESS, SCRIPTJOB_FAILURE
        ]
    }
})
