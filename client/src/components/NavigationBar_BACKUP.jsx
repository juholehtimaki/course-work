import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * Navbar components.
 */

const Nav_home = () => {
  return (
    <li className="nav-item active">
      <Link to="/" className="nav-link">
        Home
      </Link>
    </li>
  );
};

export const NavigationBar = () => {
  const auth = useSelector(state => state.auth);

  const navBar = () => {
    if (auth.role === "admin") {
      return (
        <>
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/market" className="nav-link">
              Market
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/post-item" className="nav-link">
              Post item
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/pending-items" className="nav-link">
              Pending items
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </>
      );
    } else if (auth.role === "shopkeeper") {
      return (
        <>
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/market" className="nav-link">
              Market
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/pending-items" className="nav-link">
              Pending items
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </>
      );
    } else if (auth.role === "user") {
      return (
        <>
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/market" className="nav-link">
              Market
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/post-item" className="nav-link">
              Post item
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <ul className="navbar-nav">{navBar()}</ul>
    </nav>
  );
};
