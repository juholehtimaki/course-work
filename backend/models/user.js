const mongoose = require("mongoose");
// see readme.md for issues.
const userSchema = new mongoose.Schema({
  email: {
    // Add validator function.
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  role: {
    type: String,
    required: false,
    default: "user"
  }
});

// HATEOAS links
userSchema.virtual("links").get(function() {
  return [
    {
      self: "http://localhost:5000/api/users/" + this._id
    }
  ];
});

// Don't return password
userSchema.set("toJSON", {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
  }
});

module.exports.User = mongoose.model("User", userSchema);
