import React, {useState} from 'react';
import {Link} from "react-router-dom";
import 'cirrus-ui';
import homeLogo from '../img/homeLogo.png';

function Navbar(props) {

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive)
  };

  return (
    <div
      className={`header header-fixed unselectable header-animated doc-header ${isActive ? "" : "translucent"} ${props.onScroll || "header-dark"}`}>
      <div className="header-brand">

        <div className="nav-item no-hover pl-0" style={{width: "75%", justifyContent: "flex-start"}}>
          <Link id={`nav__home__link`} to="/">
            <img src={homeLogo} alt="homeLogo" />
            {/*<h6 className="title white">Vaccine Haven</h6>*/}
          </Link>
        </div>
        <div onClick={ToggleClass} className={`nav-item nav-btn ${isActive ? "" : "active"}`} id={`header-btn`}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={`header-nav ${isActive ? "" : "active"}`} id={`header-menu`}>

        <div className="nav-right">
          <div className="nav-item">
            <Link id={`nav__info__link`} className="white" to="/info">My Info</Link>
          </div>
          <div className="nav-item has-sub toggle-hover" id="dropdown">
            <text className="white nav-dropdown-link">Register</text>
            <ul className="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item"><Link id={`nav__register__link`} to={'/registration'}>Registration</Link></li>
              <li role="menu-item"><Link id={`nav__reserve__link`} to={'/reservation'}>Reservation</Link></li>
            </ul>
          </div>
          <div className="nav-item">
            <Link id={`nav__walk_in__link`} className="white" to="">Walk-in</Link>
          </div>
          <div className="nav-item">
            <Link id={`nav__contact__link`} className="white" to="">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;