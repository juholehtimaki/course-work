const express = require("express");
const api = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const secret = require("../../utils/config").jwt_secret;

// Login
api.post("/", (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.sendStatus(401);
    return;
  }

  let email = req.body.email;
  let password = req.body.password;

  User.findOne(
    {
      email: email
    },
    (err, user) => {
      if (err) {
        return console.error(err);
      }

      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            jwt.sign(
              { id: user.id, email: user.email, role: user.role },
              secret,
              { algorithm: "HS256", expiresIn: "15min" },
              (err, token) => {
                res.json({ token: token, id: user.id, role: user.role });
              }
            );
          } else {
            res.sendStatus(401);
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
  );
});

module.exports = api;
