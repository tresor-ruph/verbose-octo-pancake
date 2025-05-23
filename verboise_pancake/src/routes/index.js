
import "index.scss"
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Login from "components/Authentification/Login.jsx"
import Signup from "components/Authentification/Signup"
import ConfirmMail from "components/Error/confirmEmail"
import Reset from "components/Error/resetPassword"
import JoinEvents from "components/Events/JoinEvents"
import Notfound from "components/Error/Notfound"
import { useSelector } from 'react-redux'

function Main(props) {
    const { isLogged } = useSelector(state => state.SessionReducer.user)

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/signup" render={(props) => !isLogged ? <Signup {...props} /> : <Redirect to='/Home' />} />
                <Route exact path="/login" render={(props) => !isLogged ? <Login {...props} /> : <Redirect to='/Home' />} />
                <Route exact path="/resetpassword/:id" render={(props) => !isLogged ? <Reset {...props} /> : <Redirect to='/Home' />} />
                <Route exact path="/confEmail/:id" render={(props) => !isLogged ? <ConfirmMail {...props} /> : <Redirect to='/Home' />} />
                <Route path="/Home" render={(props) => isLogged ? (<AdminLayout {...props} />) : <Redirect to='/login' />} />
                <Route path="/Event" render={(props) => isLogged ? (<AdminLayout {...props} />) : <Redirect to='/login' />} />
                <Route path="/Result" render={(props) => isLogged ? (<AdminLayout {...props} />) : <Redirect to='/login' />} />
                <Route path="/ResultGallup" render={(props) => isLogged ? (<AdminLayout {...props} />) : <Redirect to='/login' />} />

                <Route path="/Join" render={(props) => <JoinEvents {...props} />} />
                <Route exact path="/" render={() => isLogged ? <Redirect to='/Home' />  : <Redirect to='/login' />} />
                <Route component={Notfound} />

            </Switch>
        </BrowserRouter>

    );
}

export default Main;

