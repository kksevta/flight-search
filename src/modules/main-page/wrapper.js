import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from './actions'
import MainPageComponents from './components'
import SearchFormModule from 'app/search-form'
import FlightListModule from 'app/flight-list'

class MainPageWrapper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">Flight Search Engine</a>
                        </div>
                    </div>
                </nav>
                <div class="row">
                    <div class="col-md-4">
                        <SearchFormModule.wrapper />
                    </div>
                    <div class="col-md-8">
                        <FlightListModule.wrapper />
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, null)(MainPageWrapper)