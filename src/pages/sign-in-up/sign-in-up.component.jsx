import React, { Component } from "react";
import "./sign-in-up.styles.scss";

//components
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

class SignInUp extends Component {
  componentDidMount = () => {
    document.querySelector(".header").style.backgroundColor = "black";
  };

  render() {
    return (
      <div className="sign-in-up">
        <SignIn />
        <SignUp />
      </div>
    );
  }
}

export default SignInUp;
