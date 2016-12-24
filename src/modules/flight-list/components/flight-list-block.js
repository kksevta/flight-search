import React, { Component } from 'react';
class FlightListBlock extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {flightData} = this.props
        return (
            <div class="row">
                <div class="col-md-9">
                    <div class="row">
                        <h4>Rs. {flightData.originToDestinationFlight.price + (flightData.destinationToOriginFlight ? flightData.destinationToOriginFlight.price : 0)}</h4>
                        {flightData.originToDestinationFlight ?
                            <div class="col-md-6">
                                <h6>{flightData.originToDestinationFlight.flightNo}</h6>
                                <h5>{flightData.originToDestinationFlight.originCity} > {flightData.originToDestinationFlight.destinationCity} </h5>
                                <h6>Departure: {flightData.originToDestinationFlight.departureTime}</h6>
                                <h6>Arrival:{flightData.originToDestinationFlight.arrivalTime}</h6>
                            </div> : null

                        }
                        {
                            flightData.destinationToOriginFlight ?
                                <div class="col-md-6">
                                    <h6>{flightData.destinationToOriginFlight.flightNo}</h6>
                                    <h5>{flightData.destinationToOriginFlight.originCity} > {flightData.destinationToOriginFlight.destinationCity} </h5>
                                    <h6>Departure: {flightData.destinationToOriginFlight.departureTime}</h6>
                                    <h6>Arrival:{flightData.destinationToOriginFlight.arrivalTime}</h6>
                                </div> : null
                        }
                    </div>
                </div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-primary">BOOK THIS FLIGHT</button>
                </div>
            </div>
        );
    }
}
export default FlightListBlock;
