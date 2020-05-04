import React, { Component } from "react";
import "./sign-in-up.styles.scss";

//components
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

class SignInUp extends Component {
  render() {
    return (
      <div className="sign-in-up changing-component">
        <SignIn />
        <SignUp />
      </div>
    );
  }
}

export default SignInUp;
