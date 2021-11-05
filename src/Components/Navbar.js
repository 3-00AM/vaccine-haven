import React from 'react';
import {Link} from "react-router-dom";
import 'cirrus-ui';


function Navbar() {
  return (
    <div className="header unselectable header-animated doc-header  header-clear header-landing"
        style={{position: "absolute"}}>
      <div className="header-brand">
        <div className="nav-item no-hover">
          <a><h6 className="title white">Vaccine Haven</h6></a>
        </div>
        <div className="nav-item nav-btn" id="header-btn">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="header-nav" id="header-menu">
        <div className="nav-right">
          <div className="nav-item active">
            <Link className="white" to="/my_booking">My Booking</Link>
          </div>
          <div className="nav-item">
            <Link className="white" to="#">Insite</Link>
          </div>
          <div className="nav-item">
            <Link className="white" to="#">Walk-in</Link>
          </div>
          <div className="nav-item">
            <Link className="white" to="#">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;