import SearchFormModule from 'app/search-form';
const initialState = {
  searchedFlights: [
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SearchFormModule.actionTypes.SEARCH_FLIGHT_COMPLETED:
      return Object.assign({}, state, {
        searchedFlights: action.payload
      })
    case SearchFormModule.actionTypes.CHANGE_FLIGHT_WAY_TYPE:
      return Object.assign({}, state, {
        searchedFlights: []
      })
    default:
      return state
  }
};
