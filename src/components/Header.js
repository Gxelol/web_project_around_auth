import React from "react";

import { NavLink } from "react-router-dom";
export default function Main(props) {
  return (
    <header className="header">
      <div className="header__bar">
        <h2 className="header__title">
          Around
          <sup className="header__span">
            <sup>The U.S.</sup>
          </sup>
        </h2>
        <NavLink className="header__link" to={props.pathTo}>
          {props.registerLoginLink}
        </NavLink>
      </div>
      <div className="header__line"></div>
    </header>
  );
}
