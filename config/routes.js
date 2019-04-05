const axios = require('axios');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../auth/authenticate').jwtKey;

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

// POST http://localhost:3300/api/register
function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 4);
  user.password = hash;

  db('users')
    .insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error registering', error: error });
    });
}

// POST http://localhost:3300/api/login
function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  db('users')
    .where({username})
    // .select('id', 'username', 'password')
    .first()
    .then(u => {
      if (u && bcrypt.compareSync(password, u.password)) {
        const token = makeToken(u);
        res.status(200).json({ message: `Hello, ${u.username}!`, token });
      } else {
        res.status(401).json({ message: 'WRONG!' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error logging in', error: err });
    });
}


function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '2d'
  };

  return jwt.sign(payload, secret, options);
}