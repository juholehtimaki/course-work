const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const jwtauth = require("./utils/accessControl/jwtAuth");

const User = require("./models/user.js").User;

const saltRounds = 12;

// connect database
mongoose.connect("mongodb://localhost/WWWProgramming", {
  useNewUrlParser: true, // Get rid of deprecation warnings
  useUnifiedTopology: true
});

//routes
const login = require("./routes/api/login");
const users = require("./routes/api/users");
const items = require("./routes/api/items");

const port = 5000;
app.use(helmet());
app.use(cors());
app.use(express.json());

//JWT
app.use(jwtauth.tokenParser);

//users & items routes
app.use("/api/login", login);
app.use("/api/users", users);
app.use("/api/items", items);

//Creating admin user
const createAdminUser = () => {
  User.findOne({ role: "admin" }).then(result => {
    if (!result) {
      bcrypt.hash("12345", saltRounds, (err, hash) => {
        if (err) {
          return console.error(err);
        }
        let newUser = new User({
          email: "admin@admin.com",
          firstName: "Admin",
          lastName: "User",
          password: hash,
          role: "admin"
        });

        newUser
          .save()
          .then(() =>
            console.log(`Added admin user (${newUser.email}) to collection`)
          )
          .catch(e => console.log(e));
      });
    } else {
      console.log("Admin user already exists.");
    }
  });
};

app.listen(port, () => {
  console.log(`Backend running on port ${port}.`);
  createAdminUser();
});
