import {BrowserRouter,Route, Switch} from 'react-router-dom' 
import Login from '../components/Authentification/Login'
import HomePage from '../components/Homepage/Home.jsx'

const Main = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path= '/Home' component={HomePage} />
        </Switch>
        </BrowserRouter>
    )
}

export default Main