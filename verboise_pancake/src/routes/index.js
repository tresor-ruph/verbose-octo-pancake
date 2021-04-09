
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import Notfound from "components/Error/Notfound"
import {useSelector} from 'react-redux'

function Main(props) {
    const {isLogged} = useSelector(state=>state.SessionReducer.user)   
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/signup" render={(props) => !isLogged ? <Signup {...props} /> : <Redirect to='/' />} />
                <Route exact path="/login" render={(props) => !isLogged ? <Login {...props} /> : <Redirect to='/' />} />
                <Route exact path="/resetpassword/:id" render={(props) => !isLogged ? <Reset {...props} />:  <Redirect to='/' /> } />
                <Route exact path="/confEmail/:id" render={(props) =>!isLogged ? <ConfirmMail {...props} />:<Redirect to='/' />} />
                <Route exact path="/" render={(props) => isLogged ?( <AdminLayout {...props} />): <Redirect to='/login' />} />
                <Route component={Notfound} />

            </Switch>
        </BrowserRouter>

    );
}

export default Main;

