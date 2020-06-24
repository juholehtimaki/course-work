const express = require("express");
const api = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const requireRole = require("../../utils/accessControl/jwtAuth").requireRole;

const path = "http://localhost:5000/api/users/";
const saltRounds = 12;

// Create a new user
api.post("/", (req, res) => {
  if (
    !req.body ||
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.password
  ) {
    res.sendStatus(400);
    // Unsafe logging, can expose users password
    return console.error(
      `Failed to add a user to the database. Request: ${JSON.stringify(
        req.body
      )}`
    );
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }

    let newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      role: req.body.role
    });

    newUser.save(err => {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      console.log(`Inserted a new user (${newUser.email}) to collection`);
      res.status(201);
      res.location(path + newUser._id);
      res.json({ user: newUser });
    });
  });
});

function updateUser(id, body, res) {
  User.findByIdAndUpdate(id, body, { new: true }, (err, user) => {
    if (err) {
      res.sendStatus(400);
      return console.error(err);
    }

    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.location(path + user._id);
      res.json({ user: user });
    }
  });
}

// Update user
api.put("/:id", requireRole(["admin", "user", "shopkeeper"]), (req, res) => {
  console.log("Updating user by id: " + req.params.id);

  if (req.token.id === req.params.id || req.token.role === "admin") {
    if (req.body.password) {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }

        req.body["password"] = hash;

        updateUser(req.params.id, req.body, res);
      });
    } else {
      updateUser(req.params.id, req.body, res);
    }
  } else {
    res.sendStatus(401);
  }
});

// Get all users
api.get("/", requireRole(["admin"]), (req, res) => {
  console.log("Fetching users from backend");

  User.find((err, users) => {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    }

    if (!users) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.location(path);
      res.json({ users: users });
    }
  });
});

// Get user by id
api.get("/:id", requireRole(["admin", "shopkeeper", "user"]), (req, res) => {
  if (req.token.id === req.params.id || req.token.role === "admin") {
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.sendStatus(404);
        return console.error(err);
      }

      if (!user) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.location(path + user._id);
        res.json({ user: user });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Delete user by id
api.delete("/:id", requireRole(["admin", "shopkeeper", "user"]), (req, res) => {
  if (req.token.id === req.params.id || req.token.role === "admin") {
    User.findByIdAndDelete(req.params.id, (err, user) => {
      if (err) {
        res.sendStatus(404);
        return console.error(err);
      }

      if (!user) {
        res.sendStatus(404);
      } else {
        res.status(204);
        res.json();
        console.log("Deleted user by id: " + req.params.id);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Delete all users
api.delete("/", requireRole(["admin"]), (req, res) => {
  console.log("Deleting all users");
  User.deleteMany().exec();
  res.sendStatus(200);
});

module.exports = api;
