import React, { Component } from "react";
import "./player-block.styles.scss";

import { Link } from "react-router-dom";

class PlayerBlock extends Component {
  render() {
    return (
      <div className="player-block changing-component">
        <span>Sign In to get access to the Music Player</span>
        <Link to="/signin" className="menu-button main-color">
          Sign In / Up
        </Link>
      </div>
    );
  }
}

export default PlayerBlock;
