import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from './actions'
import SearchFormComponents from './components'
import { searchFlightThunk } from './thunks'
class SearchFormWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnFlight: false
        }
    }
    searchFlights(searchedFlightData) {
        this.props.dispatch(searchFlightThunk(searchedFlightData))
    }
    onFlightWayClick(event, returnFlight) {
        event.preventDefault()
        this.setState({
            returnFlight
        })
        this.props.dispatch(Actions.changeFlightWay())
    }
    render() {
        return (
            <div>
                <ul class="nav nav-tabs">
                    <li role="presentation" class={this.state.returnFlight ? 'inactive' : 'active'}><a href="#" value="oneway" onClick={(e) => this.onFlightWayClick(e, false)}>One Way</a></li>
                    <li role="presentation" class={this.state.returnFlight ? 'active' : 'inactive'}><a href="#" value="return" onClick={(e) => this.onFlightWayClick(e, true)}>Return</a ></li>
                </ul>
                <br />
                <SearchFormComponents.Form searchFlights={(searchedFlightData) => this.searchFlights(searchedFlightData)} returnFlight={this.state.returnFlight} />
            </div >
        )
    }
}
export default connect(null, null)(SearchFormWrapper)