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
        let cookie = this.get_cookie('jwt');
            fetch('/api/autorized', {
                method: 'get',
                headers: {
                    token : cookie
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
            return (
                <header className='header'>
                    <div className="container">
                        <div className="row">
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
                                                    <Link  to='/'> <a className="nav-link active" href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/Personal'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link " href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link active" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/Market'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link " href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link active" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/register'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link " href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                        <Route exact path='/auth'>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link  to='/'> <a className="nav-link " href="#">О нас</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Personal'><a className="nav-link" href="#">Личный кабиней</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/Market'><a className="nav-link" href="#">Услуги</a></Link>
                                                </li>
                                            </ul>
                                        </Route>
                                    </switch>
                                </nav>
                            </div>
                            <div className="col-lg-2">
                                <switch>

                                </switch>
                                <button type="button " className="flex-column btn btn-primary btn-lg btn-block">Войти</button>
                            </div>
                        </div>
                    </div>
                </header>
            );
        }
}
export default Header;