
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/animate.min.css";
import "assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Login from "components/authentification/Login"
import Signup from "components/authentification/Signup"
import ConfirmMail from "components/Error/confirmEmail"

function Main(props) {
    const { user } = useSelector(state => state.SessionReducer)
    console.log(user)
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/Signup" render={(props) => <Signup {...props} />} />
                <Route path="/Login" render={(props) => <Login {...props} />} />
                <Route path="/confEmail" render={(props) => <ConfirmMail {...props} />} />

                {user.isLogged ? <Route path="/" render={(props) => <AdminLayout {...props} />} /> : <Redirect to='/Login' />}

            </Switch>
        </BrowserRouter>

    );
}

export default Main;

