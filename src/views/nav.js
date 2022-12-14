import React from 'react';

import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar">
      <NavLink className="nav-item" to="/Reiraapp/about">
        About
      </NavLink>
      <NavLink className="nav-item" to="/Reiraapp/resume">
        Résumé
      </NavLink>
      <NavLink className="nav-item" to="/Reiraapp">
        Home
      </NavLink>
    </nav>
  );
}

export default Nav;