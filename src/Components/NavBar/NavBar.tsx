import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navbar bg-primary-subtle mb-5">
        <div className="container">
          <NavLink to="/" className="navbar-brand text-primary fs-1">
            Calorie tracker
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
