import { FlightsData } from 'app/config/data'

export const filterFlights = (searchedFlightData) => {
    var backupFlightsData = FlightsData.slice();
    var originToDestinationFlights = [];
    var destinationToOriginFlights = [];
    originToDestinationFlights = backupFlightsData.filter((flight) => {
        return ((flight.departureDate == searchedFlightData.departureDate) && (flight.originCity == searchedFlightData.originCity) && (flight.destinationCity == searchedFlightData.destinationCity))
    })
    if (searchedFlightData.returnFlight) {
        destinationToOriginFlights = backupFlightsData.filter((flight) => {
            return ((flight.departureDate == searchedFlightData.arrivalDate) && (flight.originCity == searchedFlightData.destinationCity) && (flight.destinationCity == searchedFlightData.originCity))
        })
    }
    return crunchData(searchedFlightData, originToDestinationFlights, destinationToOriginFlights)
}

function crunchData(searchedFlightData, originToDestinationFlights, destinationToOriginFlights) {
    var flightsList = []
    if (searchedFlightData.returnFlight) {
        var flightInfo = {
            originToDestinationFlight: {},
            destinationToOriginFlight: {}
        }
        for (var i = 0; i < originToDestinationFlights.length; i++) {
            for (var j = 0; j < destinationToOriginFlights.length; j++) {
                if (searchedFlightData.maxPrice >= (originToDestinationFlights[i].price + destinationToOriginFlights[j].price) && searchedFlightData.minPrice <= (originToDestinationFlights[i].price + destinationToOriginFlights[j].price)) {
                    flightInfo.originToDestinationFlight = originToDestinationFlights[i];
                    flightInfo.destinationToOriginFlight = destinationToOriginFlights[j];
                    flightsList.push(flightInfo)
                }
            }
        }
    }
    else {
        var flightInfo = {
            originToDestinationFlight: {}
        }
        for (var i = 0; i < originToDestinationFlights.length; i++) {
            if (searchedFlightData.maxPrice >= originToDestinationFlights[i].price && searchedFlightData.minPrice <= originToDestinationFlights[i].price) {
                flightInfo.originToDestinationFlight = originToDestinationFlights[i];
                flightsList.push(flightInfo)
            }
        }
    }
    return flightsList
}