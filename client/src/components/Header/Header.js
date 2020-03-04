import React, {Component} from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Route } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
            super(props);
            this.state = {
                isAutorized : false
            };
        let cookie = '';
        cookie = encodeURIComponent(cookie);
            if (this.get_cookie('jwt') === ''){
                cookie = encodeURIComponent('');
            }else {
                cookie = encodeURIComponent(this.get_cookie('jwt'));
            }
            fetch('/api/auto', {
                method: 'get',
                headers: {
                    Authorization : {
                        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTVkNDEyZTgzYjk5ZjIwOWNlMzcwZjUiLCJ1c2VybmFtZSI6IjEyMyIsInBhc3N3b3JkIjoiJDJhJDEwJGRFc0gySEUzQUVIRGNtNlU1SGd0THV4YWRyRlFoRzdSY3FQaHAydjFibFNub2xpWFZPeldpIiwiX192IjowLCJpYXQiOjE1ODMyNTc3MTcsImV4cCI6MTU4MzI1Nzc3N30.3832jmBdiJDCEWpA3z41GlB0c_0RcId2Gy5F3J1LuYk'
                    }
                }
            }).then(
                res => console.log(res.json()))
                .then(data => console.log("data: = " + data))
                .catch(err => console.log("err: = " + err));
        }
    get_cookie ( cookie_name )
    {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        console.log('Cookie = '+results);
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }
        render() {

        console.log(this.get_cookie('Authorized'));
            return (
                <header className='header bg-secondary text-white'>
                    <div className="container">
                        <div className="row" >
                            <div className="col-lg-2">
                                <div className="header__tel">
                                    Курсовой проект сделал: Кузнецов Д.А.
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <nav className="topnav">
                                    <switch>
                                        <Route exact path='/'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link text-white active" href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link text-white" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/Personal'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link text-white" href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link text-white active" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link text-white" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/Market'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link text-white" href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link active text-white" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/register'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link text-white" href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link text-white" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/auth'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link text-white" href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link text-white" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                    </switch>
                                </nav>
                            </div>
                            <div className="col-lg-2">
                                <Link  to='/Auth'><button type="button " className="flex-column btn btn-primary btn-dark text-white btn-lg btn-block">Войти</button></Link>
                            </div>
                        </div>
                    </div>
                </header>
            );
        }
}
export default Header;