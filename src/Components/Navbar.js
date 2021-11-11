
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import 'cirrus-ui';


function Navbar() {

  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY < 100
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    })
  })

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div
      className={`header header-fixed unselectable header-animated doc-header ${isActive ? "" : "translucent"} ${scroll ? "header-clear header-landing" : "header-dark"}`}
      onClick={ToggleClass}>
      <div className="header-brand">
        <div className="nav-item no-hover">
          <a><h6 className="title white">Vaccine Haven</h6></a>
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
  );
}

export default Navbar;