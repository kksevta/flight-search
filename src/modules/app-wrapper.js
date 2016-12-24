import React, { Component } from 'react';
import { withRouter } from 'react-router';
import MainPageModule from './main-page'
class AppWrapper extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }

  render() {
    return (
      <div id="container" class="container-fluid">
        <MainPageModule.wrapper />
      </div>
    );
  }
}
export default withRouter(AppWrapper);