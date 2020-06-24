import React, { useState } from "react";
import { Alert } from "./Alert.jsx";

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShopkeeper, setShopkeeper] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const register = e => {
    e.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: isShopkeeper ? "shopkeeper" : "user"
    };

    fetch("http://localhost:5000/api/users", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setShopkeeper(false);

        // Notify user of success with Alert
        if (response.ok) {
          setAlertType("success");
          setAlertMessage("User registered!");
        } else {
          setAlertType("danger");
          setAlertMessage("User registration was unsuccessful :(");
        }
      })
      .catch(e => console.log("failed"));
  };

  return (
    <div>
      <Alert type={alertType} message={alertMessage} />
      <h1>Register</h1>
      <form onSubmit={register}>
        <div className="form-group">
          <label>First name</label>
          <input
            className="form-control"
            placeholder="John"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            className="form-control"
            placeholder="Doe"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="john.doe@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            id="shopkeeper"
            type="checkbox"
            className="form-check-input"
            onChange={e => setShopkeeper(!isShopkeeper)}
          />
          <label className="form-check-label">Register as a shopkeeper</label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary my-3">
          Register
        </button>
      </form>
    </div>
  );
};
