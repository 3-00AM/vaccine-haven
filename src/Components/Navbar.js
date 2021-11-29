import React, {useState} from 'react';
import {Link} from "react-router-dom";
import 'cirrus-ui';
import homeLogo from '../img/homeLogo.png';
import firebase from "../config";
import {AuthContext} from "./Auth";

function Navbar(props) {

  const {currentUser} = useContext(AuthContext);
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive)
  };

  return (
    <div
      className={`header ${props.headerFixed ? "header-fixed" : ""} unselectable header-animated doc-header ${isActive ? "" : "translucent"} ${props.onScroll || "header-dark"}`}
      style={{zIndex: 30}}>
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
          {currentUser ? (<>
              <div className="nav-item">
                <Link id={`nav__info__link`} className="white" to="/info">My Info</Link>
              </div>
              <div className="nav-item">
                <Link id={`nav__reserve__link`} className="white" to={'/reservation'}>Reservation</Link>
              </div>
              <div className="nav-item">
                <Link id={`nav__site__link`} className="white" to="/site">Site Info</Link>
              </div>
              <div className="nav-item">
                <Link id={`nav__contact__link`} className="white" to="">Contact</Link>
              </div>
              <div className="nav-item">
                <Link id={'nav__signOut__link'} className="white" onClick={() => {
                  firebase.auth().signOut().then(() => {
                    window.location.reload()
                  }).catch(e => {
                    console.log(e)
                  })
                }}>Sign Out</Link>
              </div>
            </>
          ) : (
            <>
              <div className="nav-item">
                <Link id={`nav__walk_in__link`} className="white" to="">Walk-in</Link>
              </div>
              <div className="nav-item">
                <Link id={`nav__register__link`} className="white" to={'/registration'}>Registration</Link>
              </div>
              <div className="nav-item">
                <Link id={'nav__logIn__link'} className="white" to="/login">Log In</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;