
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ls from 'local-storage'
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/animate.min.css";
import "assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminLayout from "layouts/Admin.js";
import Login from "components/authentification/Login"
import Signup from "components/authentification/Signup"
import ConfirmMail from "components/Error/confirmEmail"
import Reset from "components/Error/resetPassword"

function Main(props) {
    let isLogged = JSON.parse(ls.get('isLogged'))
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/Signup" render={(props) => !isLogged ? <Signup {...props} /> : <Redirect to='/home' />} />
                <Route exact path="/Login" render={(props) => !isLogged ? <Login {...props} /> : <Redirect to='/home' />} />
                <Route path="/resetpassword/:id" render={(props) => <Reset {...props} />} />

                <Route path="/confEmail/:id" render={(props) => <ConfirmMail {...props} />} />
                <Route path="/home/" render={(props) => isLogged ?( <AdminLayout {...props} />): <Redirect to='/Login' />} />

            </Switch>
        </BrowserRouter>

    );
}

export default Main;

