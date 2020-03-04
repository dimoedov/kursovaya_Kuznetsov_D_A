import React, {Component} from 'react';
import FormErrors from "../FormError/FormError";
import Register from "../Register/Register";
import {Link} from "react-router-dom";

class Auth extends Component{
    constructor(props) {
        super(props);
        this.state= {
            username: '',
            password: '',
            formErrors: {username: '', password: ''},
            usernameValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
            // ,
            // () => { this.validateField(name, value) });
    };
    handleSubmit = (e) =>{
      e.preventDefault();
      console.log("login: "+this.state.username)
    };
    render() {
        return (
            <div >
                <div>
                    <h1 className='text-center text-dark'>Вход</h1>
                </div>
                <div>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className={`form-group`}>
                            <label htmlFor="username">Email address</label>
                            <input type="username" required className="form-control" name="username"
                                   placeholder="username"
                                   value={this.state.username}
                                   onChange={this.handleUserInput}  />
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="password">Password</label>
                            <input type="password" required className="form-control" name="password"
                                   placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handleUserInput}  />
                        </div>
                        <input type="submit" className="btn btn-primary btn-dark" onSubmit={this.handleSubmit} value='Отправить'/>
                    </form>
                </div>
                <div className='text-center'>
                    <Link  to='/Register'> <a href="#">Нет аккаунта</a></Link>
                </div>
            </div>

        );
    }
}

export default Auth;