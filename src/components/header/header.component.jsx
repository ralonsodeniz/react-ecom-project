import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import "./header.styles.scss";
// this is a special syntax in React for importing SVG.
// The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG
import { ReactComponent as Logo } from "../../assets/crown.svg";
const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          {/* auth.signOut uses the communication channel opened between the app and firebase and sends a null user to the app when the user signs out */}
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

export default Header;
