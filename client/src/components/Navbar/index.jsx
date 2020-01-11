import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavBarComponent({ loggedIn, _logout }) {
  return (
    <nav className="navbar navbar-light bg-dark">
      {loggedIn ? (
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/lobby" className="nav-link">
              Lobby
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/game" className="nav-link">
              Game
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/questionSubmission" className="nav-link">
              Question Submission
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link" onClick={_logout}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export const NavBar = React.memo(NavBarComponent);
