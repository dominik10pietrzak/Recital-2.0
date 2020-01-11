import React, { Component } from "react";
import "./menu-list.styles.scss";

import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class MenuList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const buttons = document.querySelectorAll(".menu .menu-button");

    setTimeout(() => {
      buttons[0].style.opacity = 1;
      buttons[0].classList.remove("fade-in-down");
    }, 1);
    setTimeout(() => {
      buttons[1].style.opacity = 1;
      buttons[1].classList.remove("fade-in-down");
    }, 250);
    setTimeout(() => {
      buttons[2].style.opacity = 1;
      buttons[2].classList.remove("fade-in-down");
    }, 500);
  };

  render() {
    return (
      <div className="menu-list">
        <div className="menu">
          <Link to="/" className="menu-button fade-in-down">
            Home
          </Link>
          <Link to="/player" className="menu-button fade-in-down">
            Music Player
          </Link>
          {this.props.currentUser ? (
            <a
              onClick={() => {
                auth.signOut();
                this.props.history.push("/");
              }}
              className="menu-button main-color fade-in-down"
            >
              Sign Out
            </a>
          ) : (
            <Link to="/signin" className="menu-button main-color fade-in-down">
              Sign In / Up
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(MenuList);
