import React from 'react';
import axios from 'axios';

import './Register.css';

class Register extends React.Component {
    state = {
        username: '',
        password: '',
    }

    render() {
        return (
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Name: </label><br/>
                        <input
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            id="username"
                            type="text" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label><br/>
                        <input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            id="password"
                            type="password" 
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
    login = event => {
        // event.preventDefault();

        const endpoint = "http://localhost:3300/api/login"
        axios
            .post(endpoint, this.state)
            .then(res => {
                console.log('LOGIN RESPONSE', res.data);
                localStorage.setItem('token', res.data.token);
                this.props.history.push("/jokes");
            })
            .catch(error => {
                console.error('LOGIN ERROR', error);
            });
    }

    handleSubmit = e => {
        e.preventDefault();

        console.log('STATE', this.state);

        const endpoint = "http://localhost:3300/api/register"
        axios
            .post(endpoint, this.state)
            .then(res => {
                console.log('REGISTER RESPONSE', res.data);
                localStorage.setItem('token', res.data.token)
            })
            .then(() => this.login(this.state))
            
            .catch(error => {
                console.error('REGISTER ERROR', error);
            });
    }

    handleInputChange = event => {
        const {id, value } = event.target;
        this.setState({ [id]: value })
    };
}

export default Register;