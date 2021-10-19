import "cirrus-ui";
import React, {useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function Register() {

  const url = "https://wcg-apis.herokuapp.com/registration"
  const [data, setData] = useState({
    name: "",
    surname: "",
    citizen_id: "",
    birthdate: "",
    occupation: "",
    address: ""
  })

  function submit(event) {
    event.preventDefault();
    Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    Axios.defaults.headers.post['Content-Type'] = 'application/json';
    Axios.post(url, {
      name: data.name,
      surname: data.surname,
      citizen_id: parseInt(data.citizen_id),
      birth_date: data.birthdate,
      occupation: data.occupation,
      address: data.address
    }).then(res => {
      console.log(res.data)
      console.log(url)
    }).catch(error => {
      console.log(error);
    });
  }

  function handle(event) {
    const newData = {...data}
    newData[event.target.id] = event.target.value
    setData(newData)
    console.log(newData)
  }


  return (
    <div className="hero fullscreen">
      <div className="content">
        <div style={{margin: "auto"}}>
          <form className="frame p-0" method="post" autocomplete="on" onSubmit={(event) => submit(event)}>
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
                          <input onChange={(event => handle(event))} type="text" id="name" value={data.name}
                                 className="form-group-input"
                                 placeholder="Enter your name" />
                        </div>
                        <div className="form-group col-6 pr-0">
                          <label className="form-group-label">
                              <span className="icon">
                                <i className="fa-wrapper far fa-user" />
                              </span>
                          </label>
                          <input onChange={(event => handle(event))} type="text" id="surname" value={data.surname}
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
                          {/*<select onChange={(event => handle(event))} className="select form-group-input" id="priority" value={data.priority} placeholder="Choose one">*/}
                          {/*  <option>High Priority</option>*/}
                          {/*  <option>Normal Priority</option>*/}
                          {/*</select>*/}
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