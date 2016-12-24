import { filterFlights } from 'app/utils/generic-collection'
const getSearchFlightsData = (searchedFlightData) => {
    return new Promise((resolve, reject) => {
        resolve(filterFlights(searchedFlightData))
    })
}

export { getSearchFlightsData }