import React, {Component} from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Route } from 'react-router-dom';

class Header extends Component {
    get_cookie ( cookie_name )
    {
        let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        console.log('Cookie = '+results);
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }
        render() {
            if (this.get_cookie('Authorized') !== null){
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
                                                        <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабинет</a></Link>
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
                                                        <Link to='/Personal'><a className="nav-link text-white active" href="#">Личный кабинет</a></Link>
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
                                                        <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабинет</a></Link>
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
                                                        <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабинет</a></Link>
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
                                                        <Link to='/Personal'><a className="nav-link text-white" href="#">Личный кабинет</a></Link>
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
                                    <Link  to='/Signout'><button type="button " className="flex-column btn btn-primary btn-dark text-white btn-lg btn-block">Выйти</button></Link>
                                </div>
                            </div>
                        </div>
                    </header>
                );

            }else{
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
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link  to='/'> <a className="nav-link text-white active" href="#">О нас</a></Link>
                                                    </li>
                                                </ul>
                                        </switch>
                                    </nav>
                                </div>
                                <div className="col-lg-2">
                                    <Link  to='/Auth'><button type="button " className="flex-column btn btn-primary btn-dark text-white btn-lg btn-block">Выйти</button></Link>
                                </div>
                            </div>
                        </div>
                    </header>
                );
            }
        }

}
export default Header;