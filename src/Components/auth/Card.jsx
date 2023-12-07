import React from "react";
import NavLinks from "./NavLinks";

const Card = ({ children, signin, activateSignin, activateSignup }) => {
  return (
    <div className="card-content">
      <NavLinks
        signin={signin}
        activateSignin={activateSignin}
        activateSignup={activateSignup}
      />
      <div>{children}</div>
    </div>
  );
};

export default Card;
