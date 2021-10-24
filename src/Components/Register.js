import "cirrus-ui";
import React, {useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function Register() {

  const base_url = 'https://wcg-apis.herokuapp.com/registration';

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    citizen_id: "",
    birthdate: "",
    occupation: "",
    address: ""
  })

  function handle(event) {
    const newData = {...data}
    newData[event.target.id] = event.target.value
    setData(newData)
    console.log(newData)
  }

  async function submit(event) {
    event.preventDefault();
    const config = {
      method: 'post',
      url: `${base_url}?name=${data.firstname}&surname=${data.lastname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    };

    await Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="hero fullscreen">
      <div className="content">
        <div style={{margin: "auto"}}>
          <form className="frame p-0" method="post" autoComplete="on" onSubmit={(event) => submit(event)}>
            <div className="frame__body p-0">
              <div className="row p-0 level fill-height">
                <div className="col">
                  <div className="space xlarge" />
                  <div className="padded">
                    <h1 className="u-text-center u-font-alt">Citizen Registration</h1>
                    <div className="divider" />
                    <p className="u-text-center">Get the user information for who want to reserve the vaccine</p>
                    <div className="divider" />

                    <div className="form-section section-inline">
                      <div className="section-body row">
                        <div className="form-group col-6 pl-0">
                          <label className="form-group-label">
                              <span className="icon">
                                <i className="fa-wrapper far fa-user" />
                              </span>
                          </label>
                          <input onChange={(event => handle(event))} type="text" id="firstname" value={data.firstname}
                                 className="form-group-input"
                                 placeholder="Enter your name" />
                        </div>
                        <div className="form-group col-6 pr-0">
                          <label className="form-group-label">
                              <span className="icon">
                                <i className="fa-wrapper far fa-user" />
                              </span>
                          </label>
                          <input onChange={(event => handle(event))} type="text" id="lastname" value={data.lastname}
                                 className="form-group-input"
                                 placeholder="Enter your surname" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-group-label">
                          <span className="icon">
                            <i className="fa-wrapper fas fa-id-card" />
                          </span>
                      </label>
                      <input onChange={(event => handle(event))} type="text" id="citizen_id" value={data.citizen_id}
                             className="form-group-input" placeholder="Enter your citizen ID" />
                    </div>

                    <div className="form-section section-inline">
                      <div className="section-body row">
                        <div className="form-group col-6 pl-0">
                          <label className="form-group-label">
                              <span className="icon">
                                <i className="fa-wrapper far fa-calendar" />
                              </span>
                          </label>
                          <input onChange={(event => handle(event))} type="date" id="birthdate" value={data.birthdate}
                                 className="form-group-input"
                                 placeholder="Enter your birthday (or not)" />
                        </div>
                        <div className="form-group col-6 pr-0">
                          <label className="form-group-label">
                              <span className="icon">
                                <i className="fa-wrapper fas fa-briefcase" />
                              </span>
                          </label>
                          <input onChange={(event => handle(event))} type="text" id="occupation" value={data.occupation}
                                 className="form-group-input" placeholder="Enter your occupation" />
                        </div>
                      </div>
                    </div>

                    <label>Address</label>
                    <textarea onChange={(event => handle(event))} id="address" value={data.address}
                              placeholder="What is your address" spellCheck="false" />

                    <div className="space" />

                    <div className="btn-group u-pull-right">
                      {/*<Link to="/reservation">*/}
                      <button className="btn-info">Next</button>
                      {/*</Link>*/}
                    </div>

                  </div>
                  <div className="space xlarge" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Register;