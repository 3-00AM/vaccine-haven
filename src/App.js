import "./App.css";
import "cirrus-ui";

import React, {Component} from "react";

import Navbar from './Navbar';
import history from "./history";
import Routes from './Routes';

let lastScrollY = 0;
let ticking = false;

class App extends Component {

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  nav = React.createRef();

  handleScroll = () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        this.nav.current.style.top = `${lastScrollY}px`;
        ticking = false;
      });

      ticking = true;
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
        <section id={'splash'}>
          <div id="splash-img" className="hero fullscreen hero-img parallax-img">
            <div className="hero-body">
              <div className="content u-text-center">
                <h1 className="uppercase black title">Easily create beautiful splash screens</h1>
                <h3 className="uppercase black sub-title faded">Only 6 lines needed and no additional CSS</h3>
              </div>
            </div>
          </div>
          <div className="transition transition--visible" />
        </section>
        <div className="p-3">
          <section className="py-1">
            <div className="hero bg-indigo-100 u-round">
              <div className="hero-body">
                <div className="px-3 w-100">
                  <div className="u-flex u-justify-space-between u-items-center animated fadeIn"
                       onScroll={this.handleScroll()}>
                    <div>
                      <h2 className="title level-left">Vaccine Registration</h2><h5
                      className="subtitle text-gray-500 level-left">For reserve vaccine.</h5>
                    </div>
                    <div className="u-items-flex-end u-inline-flex">
                      <button className="u-shadow btn-link" onClick={() => history.push('/Register')}>Register</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-1">
            <div className="hero bg-indigo-100 u-round">
              <div className="hero-body">
                <div className="px-3 w-100">
                  <div className="u-flex u-justify-space-between u-items-center animated fadeIn">
                    <div>
                      <h2 className="title level-left">Your Information</h2><h5
                      className="subtitle text-gray-500 level-left">See your reserved vaccine.</h5>
                    </div>
                    <div className="u-items-flex-end u-inline-flex">
                      <button className="u-shadow btn-link">Check Info</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-1">
            <div className="hero bg-indigo-100 u-round">
              <div className="hero-body">
                <div className="px-3 w-100">
                  <div className="u-flex u-justify-space-between u-items-center animated fadeIn">
                    <div>
                      <h2 className="title level-left">Vaccine Site</h2><h5
                      className="subtitle text-gray-500 level-left">See the Vaccine site information.</h5>
                    </div>
                    <div className="u-items-flex-end u-inline-flex">
                      <button className="u-shadow btn-link">Check Site</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default App;
