import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="nav-option">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="account-page">
      <Link to="/users/account" className="nav-option">Account Page</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <>
      <section className="top-nav">
          <div className="menu-title">Holocron</div>
          <input id="menu-toggle" type="checkbox" />
          <label className='menu-button-container' htmlFor="menu-toggle">
          <div className='menu-button'></div>
        </label>
        <ul className="menu">
            <li>
              <Link to="/" className="nav-option">Home</Link>
            </li>
            <li>
              <Link to="/about" className="nav-option">About</Link>
            </li>
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </section>

    </>
  );
};

export default TopBar;
