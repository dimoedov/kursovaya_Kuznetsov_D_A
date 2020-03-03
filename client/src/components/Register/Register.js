import React, {Component} from 'react';
import FormErrors from "../FormError/FormError"
import './register.css';
class Register extends Component {
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
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
console.log(passwordValid);
        switch(fieldName) {
            case 'username':
                usernameValid = /^[a-zA-Z][a-zA-Z0-9-_\.]{5,20}$/.test(value);
                fieldValidationErrors.username = usernameValid ? '' : 'поле должно содержать 5-20 символов, которыми могут быть буквы и цифры, первый символ обязательно буква';
                break;
            case 'password':
                passwordValid = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
                fieldValidationErrors.password = passwordValid ? '': 'поле должно содержать строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.formValid) {
            let formBody = [];
            for (var prop in this.state) {
                var encodedKey = encodeURIComponent(prop);
                var encodedValue = encodeURIComponent(this.state[prop]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('/api/signup', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log("err: =" + err));

        } else{
            console.log('password = '+this.state.passwordValid+' login = '+this.state.usernameValid );
        }
    };


    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
                    <label htmlFor="username">Email address</label>
                    <input type="username" required className="form-control" name="username"
                           placeholder="username"
                           value={this.state.username}
                           onChange={this.handleUserInput}  />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" required className="form-control" name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleUserInput}  />
                </div>
                <input type="submit" className="btn btn-primary" onSubmit={this.handleSubmit} value='Отправить'/>
            </form>
        );
    }
}
export default Register;