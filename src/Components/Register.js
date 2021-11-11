import "cirrus-ui";
import React from "react";
import Axios from "axios";
import {useForm} from 'react-hook-form';
import {useHistory} from "react-router-dom";

function Register() {

  const {register, handleSubmit, setError, trigger, formState: {errors, isValid}} = useForm({});

  const base_url = 'https://wcg-apis.herokuapp.com';
  let history = useHistory();

  const config = {
    method: 'post',
    url: ``,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };

  const onError = (errors, e) => {
    console.log(errors, e)
    console.log(isValid)
  };

  const onSubmit = async (data, event) => {
    console.log(data)
    event.preventDefault();

    config.url = `${base_url}/registration?name=${data.firstname}&surname=${data.lastname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}`

    await Axios(config)
      .then(function (response) {
        let res_data = response.data;
        let feedback = res_data.feedback;
        if (response.status === 201) {
          history.push("/");
        } else if (feedback === "registration failed: this person already registered") {
          setError("citizen_id", {
            type: "manual",
            message: "This Citizen ID already registered."
          })
        } else if (feedback === "registration failed: not archived minimum age") {
          setError("birthdate", {
            type: "manual",
            message: "Not archived minimum age."
          })
        } else if (feedback === "registration failed: invalid birth date format") {
          setError("birthdate", {
            type: "manual",
            message: "Invalid birth date."
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="hero fullscreen">
      <div className="content">
        <div style={{margin: "auto"}}>
          <form className="frame p-0" method="post" autoComplete="on" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="frame__body p-0">
              <div className="row p-0 level fill-height">
                <div className="col">
                  <div className="space xlarge" />
                  <div className="padded">
                    <h1 className="u-text-center u-font-alt">Citizen Registration</h1>
                    <div className="divider" />
                    <p className="u-text-center">Get the user information for who want to reserve the vaccine</p>
                    <div className="divider" />

                    <div className="mb-1">
                      <label className="font-bold">Citizen ID <span className="required">*</span> <span
                        className="info inline font-light">Please input your real ID.</span></label>
                      <div className="section-body">
                        <div className="input-control">
                          <input type="number"
                                 className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.citizen_id && "text-danger input-error"}`}
                                 placeholder="Citizen ID"
                                 {...register("citizen_id", {
                                   required: "Citizen ID is required",
                                   minLength: {value: 13, message: 'Citizen ID must be at least 13 characters long'},
                                   maxLength: {value: 13, message: 'Citizen ID must be at most 13 characters long'}
                                 })} onKeyUp={() => {
                            trigger("citizen_id");
                          }} />
                          <span className="icon icon-left"><i
                            className={`fa fa-wrapper fa-id-card ${errors.citizen_id && "text-danger input-error"}`}
                            aria-hidden="true" /></span>
                        </div>
                      </div>
                      {errors.citizen_id && <span className="required info">{errors.citizen_id.message}</span>}
                    </div>

                    <div className="mb-1">
                      <div className="section-body row">
                        <div className="col-6 pl-0">
                          <label className="font-bold">Firstname <span className="required">*</span></label>
                          <div className="input-control">
                            <input
                              className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.firstname && "text-danger input-error"}`}
                              type="text"
                              placeholder="Firstname"
                              {...register("firstname", {required: "Firstname is required."})}
                              onKeyUp={() => {
                                trigger("firstname");
                              }} />
                            <span className={`icon icon-left ${errors.firstname && "text-danger input-error"}`}><i
                              className="fa fa-wrapper fa-user" aria-hidden="true" /></span>
                          </div>
                          {errors.firstname && <span className="required info">{errors.firstname.message}</span>}

                        </div>

                        <div className="col-6 pr-0">
                          <label className="font-bold">Lastname <span className="required">*</span></label>
                          <div className="input-control">
                            <input
                              className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.lastname && "text-danger input-error"}`}
                              type="text"
                              placeholder="Lastname"
                              {...register("lastname", {required: "Lastname is required."})}
                              onKeyUp={() => {
                                trigger("lastname");
                              }} />
                            <span className={`icon icon-left ${errors.lastname && "text-danger input-error"}`}><i
                              className="fa fa-wrapper fa-user" aria-hidden="true" /></span>
                          </div>
                          {errors.lastname && <span className="required info">{errors.lastname.message}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-1 col-6 pl-0">
                        <label className="font-bold">Birthdate <span className="required">*</span></label>
                        <div className="input-control">
                          <input type="date"
                                 className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.birthdate && "text-danger input-error"}`}
                                 placeholder="Birthdate"
                                 {...register("birthdate", {required: "Birthdate is required."})}
                                 onKeyUp={() => {
                                   trigger("birthdate");
                                 }} />
                          <span className={`icon icon-left ${errors.birthdate && "text-danger input-error"}`}>
                            <i className="fa fa-wrapper fa-calendar" />
                          </span>
                        </div>
                        {errors.birthdate && <span className="required info">{errors.birthdate.message}</span>}
                      </div>

                      <div className="mb-1 col-6 pr-0">
                        <label className="font-bold label-small">Occupation <span className="required">*</span></label>
                        <div className="input-control">
                          <input type="text"
                                 className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.occupation && "text-danger input-error"}`}
                                 placeholder="Occupation"
                                 {...register("occupation", {required: "Occupation is required."})}
                                 onKeyUp={() => {
                                   trigger("occupation");
                                 }} />
                          <span className={`icon icon-left ${errors.occupation && "text-danger input-error"}`}>
                            <i className="fa fa-wrapper fa-briefcase" />
                          </span>
                        </div>
                        {errors.occupation && <span className="required info">{errors.occupation.message}</span>}
                      </div>
                    </div>

                    <div className="mb-1">
                      <label className="font-bold">Address <span className="required">*</span></label>
                      <textarea className={`form-group-input ${errors.address && "text-danger input-error"}`}
                                placeholder="Enter your address here"
                                {...register("address", {required: "Address is required."})}
                                onKeyUp={() => {
                                  trigger("address");
                                }} />
                      {errors.address && <span className="required info">{errors.address.message}</span>}
                    </div>

                    <div className="space" />

                    <div className="btn-group u-pull-right">
                      <button disabled={!isValid} className="btn-info"
                              type="submit">Next
                      </button>
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