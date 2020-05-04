import React, { Component } from "react";
import "./homepage.styles.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { TimelineMax, Power2 } from "gsap";

import background from "../../assets/woman.jpg";
import mobileBackground from "../../assets/guitar.jpg";

class HomePage extends Component {
  state = {};

  componentDidMount = () => {
    const header = document.querySelector(".header");
    header.style.background = "transparent";

    const container = document.querySelector(".homepage .container .content");
    const headS = document.querySelector(".homepage .container .content h2");
    const button = document.querySelector(
      ".homepage .container .content .button"
    );

    if (!(window.innerWidth <= 1024 && window.innerHeight <= 1366)) {
      const tl = new TimelineMax();
      tl.fromTo(
        container,
        1,
        { height: "0%" },
        { height: "100%", ease: Power2.easeInOut }
      )
        .fromTo(
          headS,
          0.3,
          { opacity: "0" },
          { opacity: "1", ease: Power2.easeInOut }
        )
        .fromTo(
          button,
          0.3,
          { opacity: "0" },
          { opacity: "1", ease: Power2.easeInOut }
        );
    }
  };

  componentWillUnmount = () => {
    const header = document.querySelector(".header");
    header.style.background = "black";
  };

  render() {
    return (
      <div className="homepage changing-component">
        <section className="container">
          <div className="content">
            {window.innerWidth <= 1024 && window.innerHeight <= 1366 ? (
              <img src={mobileBackground} alt="mobile" />
            ) : (
              <img src={background} alt="woman" />
            )}
            <div className="welcome">
              <h1>Music for everyone.</h1>
              <h2>Millions of songs. For free.</h2>
              <Link to="/player" className="button">
                Start right now
              </Link>
            </div>
          </div>
        </section>
        <div className="description">
          <h2>Go Premium. Be Happy.</h2>
          <h3>Try Premium free for 30 days. Only $9.99/month after.</h3>
          <h6>
            (This website is just a portfolio project so you can't subscribe for
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
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(HomePage);
