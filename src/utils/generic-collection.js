import { FlightsData } from 'app/config/data'


/**
 * Method to filter filghts data on basis of searchFlightData
 * 
 */
export const filterFlights = (searchedFlightData) => {
    var backupFlightsData = FlightsData.slice();  //making copying for original data so to avoid any mutability
    var originToDestinationFlights = [];
    var destinationToOriginFlights = [];
    originToDestinationFlights = backupFlightsData.filter((flight) => {
        return ((flight.departureDate == searchedFlightData.departureDate) && (flight.originCity == searchedFlightData.originCity) && (flight.destinationCity == searchedFlightData.destinationCity) && (flight.remainingSeates >= searchedFlightData.passengers))
    })
    if (searchedFlightData.returnFlight) {
        destinationToOriginFlights = backupFlightsData.filter((flight) => {
            return ((flight.departureDate == searchedFlightData.arrivalDate) && (flight.originCity == searchedFlightData.destinationCity) && (flight.destinationCity == searchedFlightData.originCity) && (flight.remainingSeates >= searchedFlightData.passengers))
        })
    }
    return crunchData(searchedFlightData, originToDestinationFlights, destinationToOriginFlights)
}



/**
 * Method to produce usable data at UI on basis of Filtered Data 
 * Return Data would Be
 * 
 * data=[
 *  {
 *     originToDestinationFlight:{},
 *     destinationToOriginFlight:{} 
 *  },
 *  {
 *     originToDestinationFlight:{},
 *     destinationToOriginFlight:{} 
 *  }
 * 
 * ]
 * 
 */
function crunchData(searchedFlightData, originToDestinationFlights, destinationToOriginFlights) {
    var flightsList = []
    if (searchedFlightData.returnFlight) {
        for (var i = 0; i < originToDestinationFlights.length; i++) {
            for (var j = 0; j < destinationToOriginFlights.length; j++) {
                var flightInfo = {
                    originToDestinationFlight: {},
                    destinationToOriginFlight: {}
                }
                if (searchedFlightData.maxPrice >= (originToDestinationFlights[i].price + destinationToOriginFlights[j].price) && searchedFlightData.minPrice <= (originToDestinationFlights[i].price + destinationToOriginFlights[j].price)) {
                    flightInfo.originToDestinationFlight = originToDestinationFlights[i];
                    flightInfo.destinationToOriginFlight = destinationToOriginFlights[j];
                    flightsList.push(flightInfo)
                }
            }
        }
    }
    else {
        for (var i = 0; i < originToDestinationFlights.length; i++) {
            var flightInfo = {
                originToDestinationFlight: {}
            }
            if (searchedFlightData.maxPrice >= originToDestinationFlights[i].price && searchedFlightData.minPrice <= originToDestinationFlights[i].price) {
                flightInfo.originToDestinationFlight = originToDestinationFlights[i];
                flightsList.push(flightInfo)
            }
        }
    }
    return flightsList
}