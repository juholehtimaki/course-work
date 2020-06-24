import React, { useState } from "react";
import { sendLoginRequest } from "../redux/actions/loginActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Unconnected component.
const AlertC = props => {
  if (props.token) return <Redirect to="/" />; //redirects on succesfull login
  const success = props.success;
  if (success === false) {
    return (
      <div className={"alert alert-danger"} role="alert">
        Incorrect email or password
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  const error = state.auth.error;
  const token = state.auth.token;
  return { success: error === null, token: token };
};

// Connected Alert-component
const Alert = connect(mapStateToProps)(AlertC);

// Unconnected LoginPage-component.
const LoginPageC = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = e => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password
    };
    // Send login request to API.
    props.sendLoginRequest(credentials);
  };

  return (
    <div>
      <Alert />
      <h1>Login</h1>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="john.doe@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="*******"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn btn-success my-3">
          Login
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  sendLoginRequest
};

export const LoginPage = connect(
  null, // Might need state for error display or to see if success?
  mapDispatchToProps
)(LoginPageC);
