import React, { Component } from "react";
import "./homepage.styles.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import video from "../../assets/dj.mp4";

class HomePage extends Component {
  state = {};

  componentDidMount = () => {
    document.querySelector(".header").style.backgroundColor = "transparent";
    setTimeout(() => {
      document.querySelector(".bg-color").style.opacity = 0.8;
    }, 1);
  };

  render() {
    return (
      <div className="homepage">
        <div className="background">
          {window.innerWidth < 1024 && window.innerHeight < 1366 ? null : (
            <video autoPlay muted loop className="video">
              <source src={video} />
            </video>
          )}
          <div className="bg-color"></div>
        </div>
        <div className="container">
          <div className="content">
            <h1>Music for everyone.</h1>
            <h2>Millions of songs. For free.</h2>
            <Link to="/player" className="button">
              Start right now
            </Link>
          </div>
        </div>
        <div className="description">
          <h1>Go Premium. Be Happy.</h1>
          <h2>Try Premium free for 30 days. Only $9.99/month after.</h2>
          <h6>
            (The website is only a portfolio project so you can't subscribe for
            real.)
          </h6>
          <Link to="/signin" className="menu-button main-color">
            {this.props.currentUser ? "Music Player" : "Sign In / Up"}
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(HomePage);
