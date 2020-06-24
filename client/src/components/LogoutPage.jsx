import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/loginActions";

export const LogoutPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  });

  return (
    <div>
      <p className="alert alert-success">Logout successful</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};
