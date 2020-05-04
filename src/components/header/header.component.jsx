import React from "react";
import "./header.styles.scss";

import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

import "hamburgers";

let isActive = false;

const handleMenuClick = () => {
  document.querySelector(".header").classList.toggle("black-bgc");
  document.querySelector(".list").classList.toggle("menu-list-active");
  document.querySelector(".hamburger").classList.toggle("is-active");
  document.querySelector(".changing-component").classList.toggle("invisible");

  const listElements = [...document.querySelectorAll(".list a")];

  isActive = !isActive;

  if (isActive) {
    document.querySelector("html").style.overflowY = "hidden";
    for (let i = 0; i < listElements.length; i++) {
      setTimeout(() => {
        listElements[i].style.opacity = "1";
      }, i * 100);
    }
    window.scrollTo(0, 0);
  } else if (!isActive) {
    document.querySelector("html").style.overflowY = "scroll";
    for (let i = 0; i < listElements.length; i++) {
      setTimeout(() => {
        listElements[i].style.opacity = "0";
      }, 1);
    }
  }
};

const checkVisibility = () => {
  if (window.innerWidth <= 1024 && window.innerHeight <= 1366) {
    handleMenuClick();
  }
};

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Recital 2.0</h1>
      </div>
      <div className="list">
        <Link to="/" className="menu-button" onClick={checkVisibility}>
          Home
        </Link>
        <Link to="/player" className="menu-button" onClick={checkVisibility}>
          Music Player
        </Link>
        {currentUser ? (
          <a
            onClick={() => {
              auth.signOut();
              checkVisibility();
            }}
            className="menu-button main-color"
          >
            Sign Out
          </a>
        ) : (
          <Link
            to="/signin"
            className="menu-button main-color"
            onClick={checkVisibility}
          >
            Sign In / Up
          </Link>
        )}
      </div>
      <button
        class="hamburger hamburger--vortex"
        type="button"
        onClick={handleMenuClick}
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Header);
