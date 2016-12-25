import * as ActionTypes from './action-types';
export const searchFlightStarted = () => ({
    type: ActionTypes.SEARCH_FLIGHT_STARTED,
    payload: {}
});
export const searchFlightFailed = (payload) => ({
    type: ActionTypes.SEARCH_FLIGHT_FAILED,
    payload
});
export const searchFlightCompleted = (payload) => ({
    type: ActionTypes.SEARCH_FLIGHT_COMPLETED,
    payload
});
export const changeFlightWay = (payload) => ({
    type: ActionTypes.CHANGE_FLIGHT_WAY_TYPE,
    payload
});