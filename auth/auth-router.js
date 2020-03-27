/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Imports
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Model
const Users = require("./users-model");

function makeToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "thesecret",
    options
  );
  return token;
}
// CRUD
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error register this new user"
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const Token = makeToken(user);
        res.status(200).json({
          message: `Hello ${user.username}`,
          Token
        });
      } else {
        res.status(401).json({
          message: "Wrong credentials"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error logging in"
      });
    });
});

module.exports = router;