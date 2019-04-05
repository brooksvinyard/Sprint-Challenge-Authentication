import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth.js';
import './Jokes.css';

class Jokes extends React.Component {
    state = {
        jokes: []
    }

    render() {
        return(
            <div className="jokes">
                <h2>Dad Jokes</h2>
                    {this.state.jokes.map(e => (
                        <div className="jokes" key = {e.id}>
                            <p> {e.joke}</p>
                        </div>
                    ))}
            </div>
        )
    }

    componentDidMount() {
        const endpoint = `/jokes`;
        axios
        .get(endpoint)
        .then(res => {
            this.setState({ jokes: res.data })
        })
        .catch(err => {
            console.error('JOKES ERROR', err)
        });
    }
}

export default requiresAuth(Jokes);