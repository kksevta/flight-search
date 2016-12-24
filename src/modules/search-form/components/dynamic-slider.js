import React, { Component } from 'react';
var Slider = require('rc-slider');
require('rc-slider/assets/index.css');

class DynamicSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxSliderVal: 100000,
            minSliderVal: 0,
            sliderVal: [0, 100000]
        }
        this.onSliderChange = this.onSliderChange.bind(this)
        this.style = { width: 400, marginLeft: '10%' };
    }
    onSliderChange(value) {
        this.setState({
            sliderVal: value
        })
        this.props.onPriceSliderChange(value)
    }

    render() {
        return (
            <div style={this.style}>
                <div>
                    <b>Price(INR)</b><br />
                    <b>Min:{this.state.sliderVal[0]}</b><br />
                    <b>Max:{this.state.sliderVal[1]}</b>
                </div><br />
                <Slider range defaultValue={[0, 100000]} min={this.state.minSliderVal} max={this.state.maxSliderVal}
                    onChange={this.onSliderChange} />
            </div>
        );
    }
}

export default DynamicSlider;