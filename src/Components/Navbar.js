import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import 'cirrus-ui';


function Navbar(props) {

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div
      className={`header header-fixed unselectable header-animated doc-header ${isActive ? "" : "translucent"} ${props.onScroll || "header-dark"}`}
      onClick={ToggleClass}>
      <div className="header-brand">
        <div className="nav-item no-hover">
          <Link to="/"><h6 className="title white">Vaccine Haven</h6></Link>
        </div>
        <div className={`nav-item nav-btn ${isActive ? "" : "active"}`} onClick={ToggleClass} id={`header-btn`}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={`header-nav ${isActive ? "" : "active"}`} onClick={ToggleClass} id={`header-menu`}>

        <div className="nav-right">
          <div className="nav-item">
            <Link className="white" to="/citizen">My Info</Link>
          </div>
          <div className="nav-item has-sub toggle-hover" id="dropdown">
            <Link className="white nav-dropdown-link">Registration</Link>
            <ul className="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item"><Link to={'/registration'}>Citizen Registration</Link></li>
              <li role="menu-item"><Link to={'/reservation'}>Reservation</Link></li>
            </ul>
          </div>
          <div className="nav-item">
            <Link className="white" to="">Walk-in</Link>
          </div>
          <div className="nav-item">
            <Link className="white" to="">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;