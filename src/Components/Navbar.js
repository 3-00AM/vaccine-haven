import React from 'react';
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
            <a className="white" href="#">My Booking</a>
          </div>
          <div className="nav-item">
            <a className="white" href="#">Insite</a>
          </div>
          <div className="nav-item">
            <a className="white" href="#">Walk-in</a>
          </div>
          <div className="nav-item">
            <a className="white" href="#">Contact</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;