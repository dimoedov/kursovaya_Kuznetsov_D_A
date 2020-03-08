import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Home from '../Home/Home'
import Personal from '../Personal/Personal'
import Auth from '../Auth/Auth'
import Register from '../Register/Register'
import Signout from "../Signout/Signout";
import FormList from "../FormList/FormList";
function Main() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/Auth' component={Auth}/>
                <Route path='/Register' component={Register}/>
                <Route path='/Personal' component={Personal}/>
                <Route path='/Signout' component={Signout}/>
                <Route path='/FormList' component={FormList}/>
            </Switch>
        </main>
    );
}
export default Main;