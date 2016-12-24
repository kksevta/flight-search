import React from 'react'
import { Route, IndexRoute, Router, hashHistory, browserHistory, IndexRedirect } from "react-router";
import AppWrapper from './app-wrapper'
const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppWrapper}>
    </Route>
  </Router>
)
export default Routes