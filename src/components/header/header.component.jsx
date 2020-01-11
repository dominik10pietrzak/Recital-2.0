import React from "react";
import "./header.styles.scss";

import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Recital 2.0</h1>
      </div>
      <div className="menu">
        <div className="list">
          <Link to="/" className="menu-button">
            Home
          </Link>
          <Link to="/player" className="menu-button">
            Music Player
          </Link>
          {currentUser ? (
            <a
              onClick={() => auth.signOut()}
              className="menu-button main-color"
            >
              Sign Out
            </a>
          ) : (
            <Link to="/signin" className="menu-button main-color">
              Sign In / Up
            </Link>
          )}
        </div>
      </div>
      <Link to="/menu" className="menu-list-button">
        <i class="fas fa-bars"></i>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(Header);
