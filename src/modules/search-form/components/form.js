import React, { Component } from 'react';
import { Cities } from 'app/config/data'
import DynamicSlider from './dynamic-slider'
import * as Errors from 'app/config/errors'
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formDirty: true,            //boolean for form validation
            errorMessage: 'No Error',   // Error Message to display on form validation
            showFilter: false            //boolean to show slider filter
        }
    }
    /**
     * This method would be called when Slider will be moved
     * 
     */
    onPriceSliderChange(priceSliderVal) {
        this.performSearch(priceSliderVal)
    }

    /**
     * Method to check validity of search Form before performing Search operation
     * 
     */
    isFormDirty(searchedFlightData) {
        let Error = ''
        if (searchedFlightData.originCity == searchedFlightData.destinationCity) {
            Error = Errors.ORIGIN_DESTINATION_SAME
        }
        else if (!searchedFlightData.departureDate || (searchedFlightData.returnFlight && !searchedFlightData.arrivalDate)) {
            Error = Errors.DATES_NOT_SELECTED
        }
        else if (searchedFlightData.returnFlight && (searchedFlightData.arrivalDate < searchedFlightData.departureDate)) {
            Error = Errors.DEPARTURE_DATE_ARRIVAL_DATE_MISMATCH_ERROR
        }


        if (Error) {
            // If some Error in form 
            this.setState({
                formDirty: true,
                showFilter: false,
                errorMessage: Error
            })
            return true
        }
        else {
            // If Form is valid 
            this.setState({
                formDirty: false,
                errorMessage: 'No Error',
                showFilter: true
            })
            return false
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            showFilter: false
        })
    }

    performSearch(priceSliderVal) {
        const refs = this.refs;

        //creating searched Flight Data on basis of selected data
        const searchedFlightData = {
            originCity: refs.selectorigincity.value,
            destinationCity: refs.selectdestinationcity.value,
            departureDate: refs.txtdeparturedate.value,
            passengers: refs.selectpassengers.value,
            returnFlight: this.props.returnFlight,
            minPrice: priceSliderVal ? priceSliderVal[0] : 0,
            maxPrice: priceSliderVal ? priceSliderVal[1] : Number.MAX_SAFE_INTEGER
        }
        if (searchedFlightData.returnFlight) {
            searchedFlightData.arrivalDate = refs.txtarrivaldate.value;
        }
        if (!this.isFormDirty(searchedFlightData)) {
            this.props.searchFlights(searchedFlightData)
        }
    }
    onClickSearchFlights(event) {
        event.preventDefault();
        this.performSearch()
    }

    render() {
        const {returnFlight} = this.props
        return (
            <div>
                <div>
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-md-3 control-label" for="selectorigincity">Origin City</label>
                            <div class="col-md-9">
                                <select ref="selectorigincity" name="selectorigincity" class="form-control">
                                    {
                                        Cities.map((city) => {
                                            return <option key={city.id} value={city.id}>{city.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="selectdestinationcity">Desitination City</label>
                            <div class="col-md-9">
                                <select ref="selectdestinationcity" name="selectdestinationcity" class="form-control">
                                    {
                                        Cities.map((city) => {
                                            return <option key={city.id} value={city.id}>{city.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" for="txtdeparturedate">Departure Date</label>
                            <div class="col-md-9">
                                <input ref="txtdeparturedate" name="txtdeparturedate" type="date" class="form-control input-md" required="" />
                            </div>
                        </div>
                        {returnFlight ?
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="txtarrivaldate">Arrival Date</label>
                                <div class="col-md-9">
                                    <input ref="txtarrivaldate" name="txtarrivaldate" type="date" class="form-control input-md" required="" />
                                </div>
                            </div> : null
                        }
                        <div class="form-group">
                            <label class="col-md-3 control-label" for="selectpassengers">Passengers</label>
                            <div class="col-md-9">
                                <select ref="selectpassengers" name="selectpassengers" class="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" for="btnsearchflight"></label>
                            <div class="col-md-9">
                                <button id="btnsearchflight" name="btnsearchflight" onClick={(event) => this.onClickSearchFlights(event)} class="btn btn-primary">Search Flights</button>
                            </div>
                        </div>
                    </form>
                    {
                        (this.state.formDirty && this.state.errorMessage !== 'No Error') ?
                            <div class="alert alert-danger" role="alert">{this.state.errorMessage}</div> : null
                    }

                </div>
                {this.state.showFilter && !this.state.isFormDirty ?
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Refine Flight Search</h3>
                        </div>
                        <div class="panel-body">
                            <DynamicSlider onPriceSliderChange={(priceSliderVal) => this.onPriceSliderChange(priceSliderVal)} />
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}
export default Form;
