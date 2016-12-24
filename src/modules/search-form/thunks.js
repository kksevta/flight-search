import * as Actions from './actions'
import * as Model from './model'
const searchFlightThunk = (searchFlightData) => {
  return function (dispatch, getState) {
    dispatch(Actions.searchFlightStarted());
    return Model.getSearchFlightsData(searchFlightData)
      .then(response => {
        dispatch(Actions.searchFlightCompleted(response))
        return response;
      })
      .catch(response => {
        dispatch(Actions.searchFlightFailed(response))
        return response
      })
  };
}

export { searchFlightThunk }