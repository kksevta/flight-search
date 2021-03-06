import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from './actions'
import FlightListComponents from './components'
class FlightSearchWrapper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {searchedFlights} = this.props;
        return (
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Flights Available</h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                        {
                            searchedFlights.map((flight, index) => {
                                return (
                                    <li class="list-group-item" key={index}>  <FlightListComponents.FlightListBlock flightData={flight} /></li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        searchedFlights: state.mainPage.searchedFlights
    }
}
export default connect(mapStateToProps, null)(FlightSearchWrapper)