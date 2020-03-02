import React, {Component} from 'react';


class Register extends Component {
    constructor(props) {
        super(props);
        // let data = new FormData();
        let username = props.username;
        let usernameIsValid = this.validateUsername(username);
        let password = props.password;
        let passwordIsValid = this.validatePassword(password);
        this.state = {username: username, password: password, usernameValid: usernameIsValid, passwordValid: passwordIsValid};

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validatePassword(pass){
        return true;
    }
    validateUsername(name){
        return true;
    }

    usernameChange(e) {
        var val = e.target.value;
        console.log(val);
        var valid = this.validateUsername(val);
        this.setState({username: val, usernameValid: valid});
        // this.data.append(,val);
    }

    passwordChange(e) {
        var val = e.target.value;
        var valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
        // this.data.append(1,val);
    }

    handleSubmit(event) {
        let formBody = [];
        for (let prop in this.state){
            let key = encodeURIComponent(prop);
            let value = encodeURIComponent(this.state[prop]);
            formBody.push(key+'='+value);
        }
        formBody = formBody.join("&");
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
            //     {
            //     username : this.state.username,
            //     password : this.state.password
            // }
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Login:
                    <input type="text" value={this.state.username} onChange={this.usernameChange} />
                </label>
                <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={this.passwordChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
        );
    }
}
export default Register;