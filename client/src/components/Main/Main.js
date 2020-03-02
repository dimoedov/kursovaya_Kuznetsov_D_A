import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Home from '../Home/Home'
import Personal from '../Personal/Personal'
import Market from '../Market/Market'
import Auth from '../Auth/Auth'
import Register from '../Register/Register'
function Main() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/Auth' component={Auth}/>
                <Route exact path='/Register' component={Register}/>
                <Route path='/Personal' component={Personal}/>
                <Route path='/Market' component={Market}/>
            </Switch>
        </main>
    );
}
export default Main;
// надо добавить passport.js и настроить его