
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "index.scss"

import AdminLayout from "layouts/Admin.js";
import Login from "components/authentification/Login"

import Signup from "components/authentification/Signup"
import ConfirmMail from "components/Error/confirmEmail"
import Reset from "components/Error/resetPassword"
import Event from "components/Events/Event"
import Notfound from "components/Error/Notfound"

import { useSelector } from 'react-redux'

function Main(props) {
    const { isLogged } = useSelector(state => state.SessionReducer.user)

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/signup" render={(props) => !isLogged ? <Signup {...props} /> : <Redirect to='/dashboard' />} />
                <Route exact path="/login" render={(props) => !isLogged ? <Login {...props} /> : <Redirect to='/dashboard' />} />
                <Route exact path="/resetpassword/:id" render={(props) => !isLogged ? <Reset {...props} /> : <Redirect to='/dashboard' />} />
                <Route exact path="/confEmail/:id" render={(props) => !isLogged ? <ConfirmMail {...props} /> : <Redirect to='/dashboard' />} />
                <Route path="/dashboard" render={(props) => isLogged ? (<AdminLayout {...props} />) : <Redirect to='/login' />} />
                
                <Route path="/Join" render={(props) => <Event {...props} />} />
                <Route exact path="/" render={() => isLogged ? <Redirect to='/dashboard' />  : <Redirect to='/login' />} />
                <Route component={Notfound} />

            </Switch>
        </BrowserRouter>

    );
}

export default Main;

