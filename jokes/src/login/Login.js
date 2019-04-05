import React from 'react';
import axios from 'axios';

import './Login.css';

class Login extends React.Component {
    state = {
        username: 'frodo',
        password: 'pass'
    }

    render() {
        return (
            <div className="login">
            <h2>Please Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Name</label><br/>
                        <input
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            id="username"
                            type="text" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br/>
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

    handleSubmit = event => {
        event.preventDefault();

        const endpoint = "http://localhost:3300/api/login"
        axios
            .post(endpoint, this.state)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                this.props.history.push("/");
            })
            .catch(error => {
                console.error('LOGIN ERROR', error);
            });
    }

    handleInputChange = event => {
        const {id, value } = event.target;
        this.setState({ [id]: value })
    };
}

export default Login;