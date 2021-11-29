import React, {useContext, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Link} from "react-router-dom";
import AOS from "aos";
import 'aos/dist/aos.css';
import {AuthContext} from "./Auth";
import {db} from "../config";

function Home() {
  const [scroll, setScroll] = useState(0)
  const [citizen_id, setCitizenID] = useState("")
  const {currentUser} = useContext(AuthContext);

  if (currentUser) {
    db.collection('users').doc(currentUser.uid).get().then(doc => {
      setCitizenID(doc.data().citizen_id)
    })
  }

  console.log(citizen_id)

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY < 100
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    })
  })

  useEffect(() => {
    AOS.init();
  })

  return (
    <div className="Home">
      <Navbar onScroll={scroll ? "header-clear header-landing" : "header-dark"} headerFixed={true} />
      <section id={'splash'}>
        <div id="splash-img" className="hero fullscreen hero-img parallax-img">
          <div className="hero-body">
            <div className="content u-text-center">
              <h1 className="uppercase white title" data-aos="zoom-in" data-aos-duration="1000">Vaccine Haven</h1>
              <h3 className="uppercase white sub-title faded" data-aos="zoom-in" data-aos-duration="1200">Vaccine for
                                                                                                          everyone</h3>
            </div>
          </div>
        </div>
        <div className="transition transition--visible" />
      </section>
      <div className="p-3">
        {currentUser ? (
          <>
            <section className="py-1">
              <div className="hero bg-indigo-100 u-round" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                <div className="hero-body">
                  <div className="px-3 w-100">
                    <div className="u-flex u-justify-space-between u-items-center">
                      <div>
                        <h2 className="title level-left ">Vaccine Reservation</h2>
                        <h5 className="subtitle text-gray-500 level-left">Reservation for Vaccine.</h5>
                      </div>
                      <div className="u-items-flex-end u-inline-flex">
                        <Link id={`reserve__link`} to="/reservation">
                          <button className="u-shadow btn-link">Reserve Vaccine</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-1">
              <div className="hero bg-indigo-100 u-round" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                <div className="hero-body">
                  <div className="px-3 w-100">
                    <div className="u-flex u-justify-space-between u-items-center">
                      <div>
                        <h2 className="title level-left">Your Information</h2>
                        <h5 className="subtitle text-gray-500 level-left">See your reserved vaccine.</h5>
                      </div>
                      <div className="u-items-flex-end u-inline-flex">
                        <Link id={`check_info__link`} to="/info">
                          <button className="u-shadow btn-link">Check Info</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="py-1">
              <div className="hero bg-indigo-100 u-round" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                <div className="hero-body">
                  <div className="px-3 w-100">
                    <div className="u-flex u-justify-space-between u-items-center">
                      <div>
                        <h2 className="title level-left">Citizen Registration</h2>
                        <h5 className="subtitle text-gray-500 level-left">For registration citizen.</h5>
                      </div>
                      <div className="u-items-flex-end u-inline-flex">
                        <Link id={`register__link`} to="/registration">
                          <button className="u-shadow btn-link">Register</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        <section className="py-1">
          <div className="hero bg-indigo-100 u-round" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <div className="hero-body">
              <div className="px-3 w-100">
                <div className="u-flex u-justify-space-between u-items-center">
                  <div>
                    <h2 className="title level-left">Vaccine Site</h2>
                    <h5 className="subtitle text-gray-500 level-left">See the Vaccine site information.</h5>
                  </div>
                  <div className="u-items-flex-end u-inline-flex">
                    <Link id={`check_site__link`} to="/site">
                      <button className="u-shadow btn-link">Check Site</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;