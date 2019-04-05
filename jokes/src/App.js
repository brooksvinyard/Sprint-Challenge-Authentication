import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';
// import Header from "./header/Header";
import Login from './login/Login.js';
import Register from './register/Register.js';
import Jokes from './jokes/Jokes.js';

class App extends Component {
  render() {
    return (
      <>
      {/* <Header /> */}
      <header className="header">
              <div className="left">
                  <Link to={`/`}>
                      <h2>JOKES</h2>
                  </Link>
              </div>
              <div className="right">
                  <Link to={`/register`}>
                      <p>Register</p>
                  </Link>
                  <Link to={`/login`}>
                      <p>Login</p>
                  </Link>
                  <Link to="/jokes">
                      <p>Jokes</p>
                  </Link>
                  <Link to={`/`}>
                      <p onClick={this.Logout}>Logout</p>
                  </Link>
              </div>
          </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </>
    );
  }

  Logout = () => {
    localStorage.removeItem('token')
  }
}

function Home(props) {
  return <h1>Welcome To Dad Jokes!</h1>;
}
export default App;
