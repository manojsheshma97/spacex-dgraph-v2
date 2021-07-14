import React, { Fragment } from 'react';
//import { Router } from '@reach/router';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';

import Launches from './Launches';
import Cart from './Cart';
import BookedTrips from './BookedTrips';
import Navbar from './Navbar';
import './index.css'

export default function Pages() {
  return (
    <Fragment>
        <Router primary={false} component={Fragment}>
            <Navbar/>
            <br></br>
          <Switch>
            <Route exact path="/">
                <Launches/>
            </Route>
            <Route path="/cart" >
                <Cart/>
            </Route>
            <Route path="/bookedTrips">
                <BookedTrips />
            </Route>
          </Switch>
        </Router>
    </Fragment>
  );
}
