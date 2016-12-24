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
    default:
      return state
  }
};
