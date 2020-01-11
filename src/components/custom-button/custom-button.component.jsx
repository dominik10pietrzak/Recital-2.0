import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignIn, color, ...otherProps }) => {
  return (
    <button className={`${color} custom-button`} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
