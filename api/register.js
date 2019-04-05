const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const secret = require ('../api/secrets.js').jwtSecret;
const Users = require('../users/users-model.js');

// POST http://localhost:3300/api/register
router.post('/', (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;