import React from "react";
import "./footer.styles.scss";

import linkedin from "../../assets/linkedin.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-data">
        <span className="contact">
          <span className="creamy">e-mail</span>: d.pietrzak516@op.pl
        </span>
        <span className="contact">
          <span className="creamy">tel</span>: 662-792-664
        </span>
      </div>
      <div className="social-media">
        <a href="https://www.linkedin.com/in/dominik-pietrzak-0223bb197/">
          <img src={linkedin} alt="li" />
        </a>
        <a href="https://www.facebook.com/dominik.pietrzak.10">
          <img src={facebook} alt="fb" />
        </a>
        <a href="https://www.instagram.com/dominik__pietrzak/?hl=pl">
          <img src={instagram} alt="ig" />
        </a>
      </div>
      <footer class="copy-footer">
        {" "}
        <span>
          &copy; 2020 Recital 2.0&emsp;-&emsp;Music provided by{" "}
          <a href="https://ncsmusic.com/">NoCopyrightSounds</a>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
