import React, { Component } from "react";
import "./player-block.styles.scss";

import { Link } from "react-router-dom";

class PlayerBlock extends Component {
  componentDidMount = () => {
    document.querySelector(".header").style.backgroundColor = "black";
  };
  render() {
    return (
      <div className="player-block">
        <span>Sign In to get access to the Music Player</span>
        <Link to="/signin" className="menu-button main-color">
          Sign In / Up
        </Link>
      </div>
    );
  }
}

export default PlayerBlock;
