import React, { Component } from 'react';
import { Cities } from 'app/config/data'
import DynamicSlider from './dynamic-slider'
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formDirty: true,
            errorMessage: 'No Error'
        }
    }
    onPriceSliderChange(priceSliderVal) {
        this.performSearch(priceSliderVal)
    }
    isFormDirty(searchedFlightData) {
        if ((searchedFlightData.originCity == searchedFlightData.destinationCity)
            || !searchedFlightData.departureDate
            || (searchedFlightData.returnFlight && !searchedFlightData.arrivalDate)
            || (searchedFlightData.returnFlight && (searchedFlightData.arrivalDate < searchedFlightData.departureDate))
        ) {
            return false
        }
        return true
    }

    performSearch(priceSliderVal) {
        const refs = this.refs;

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
        if (this.isFormDirty(searchedFlightData)) {
            this.setState({
                formDirty: false,
                errorMessage: 'No Error'
            })
            this.props.searchFlights(searchedFlightData)
        }
        else {
            this.setState({
                formDirty: true,
                errorMessage: 'Some Error in Selection'
            })
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
                                            return <option key={city.id} value={city.name}>{city.name}</option>
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
                                            return <option key={city.id} value={city.name}>{city.name}</option>
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
                                    <option value="1">3</option>
                                    <option value="2">4</option>
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
                {!this.state.formDirty ?
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