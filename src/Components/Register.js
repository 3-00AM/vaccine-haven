import React from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
import {useHistory} from "react-router-dom";
import Navbar from "./Navbar";
import "cirrus-ui";
import {toaster} from "evergreen-ui"
import {BASE_URL, config} from "../utils";
import CitizenID from "./CitizenID";
import ThaiNationalID from "../lib/validate";


function Register() {

  const {register, handleSubmit, setError, trigger, formState: {errors, isValid}} = useForm({});

  let history = useHistory();

  const onError = (errors, e) => {
    console.log(errors, e)
    console.log(isValid)
  };


  const onSubmit = async (data, event) => {
    event.preventDefault();
    config.params = data;

    await axios.post(`${BASE_URL}/registration`, null, config)
      .then(function (response) {
        let res_data = response.data;
        let feedback = res_data.feedback;
        if (response.status === 201) {
          history.push("/");
          toaster.success("Registration Successful!", {
            id: "forbidden-action",
            description: "Now you can proceed to reservation page for reserving the vaccine.",
            duration: 5,
            zIndex: 100
          })
        } else if (feedback === "registration failed: this person already registered") {
          setError("citizen_id", {
            type: "manual",
            message: "This Citizen ID already registered."
          })
          toaster.danger("Registration Failed!", {
            id: "forbidden-action",
            description: "This person is already registered.",
            duration: 5,
            zIndex: 100
          })
        } else if (feedback === "registration failed: not archived minimum age") {
          setError("birth_date", {
            type: "manual",
            message: "Minimum age has to be at least 30 years old."
          })
          toaster.danger("Registration Failed!", {
            id: "forbidden-action",
            description: "Not archived minimum age.",
            duration: 5,
            zIndex: 100
          })
        } else if (feedback === "registration failed: invalid birth date format") {
          setError("birth_date", {
            type: "manual",
            message: "Invalid birth date."
          })
          toaster.danger("Registration Failed!", {
            id: "forbidden-action",
            description: "Invalid birth date format.",
            duration: 5,
            zIndex: 100
          })
        }
      })
      .catch(function (error) {
        toaster.danger("Registration Failed!", {
          id: "forbidden-action",
          description: "Something went wrong!",
          duration: 5,
          zIndex: 100
        })
        console.log(error);
      });
  };

  return (
    <div className="background__blue">
      <Navbar />
      <div className="card content" style={{background: "white"}}>
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

                    <CitizenID errors={errors} useFormRegisterReturn={register("citizen_id", {
                      required: "Citizen ID is required",
                      minLength: {value: 13, message: 'Citizen ID must be at least 13 characters long'},
                      maxLength: {value: 13, message: 'Citizen ID must be at most 13 characters long'},
                      validate: value => ThaiNationalID(value) || "Invalid Citizen ID"
                    })} onKeyUp={() => {
                      trigger("citizen_id");
                    }} />

                    <div className="mb-1">
                      <div className="section-body row">
                        <div className="col-6 pl-0">
                          <label className="font-bold">Firstname <span className="required">*</span></label>
                          <div className="input-control">
                            <input
                              id={`name`}
                              className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.name && "text-danger input-error"}`}
                              type="text"
                              placeholder="Firstname"
                              {...register("name", {required: "Firstname is required."})}
                              onKeyUp={() => {
                                trigger("name");
                              }} />
                            <span className={`icon icon-left ${errors.name && "text-danger input-error"}`}><i
                              className="fa fa-wrapper fa-user" aria-hidden="true" /></span>
                          </div>
                          {errors.name && <span className="required info">{errors.name.message}</span>}

                        </div>

                        <div className="col-6 pr-0">
                          <label className="font-bold">Lastname <span className="required">*</span></label>
                          <div className="input-control">
                            <input
                              id={`surname`}
                              className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.surname && "text-danger input-error"}`}
                              type="text"
                              placeholder="Lastname"
                              {...register("surname", {required: "Lastname is required."})}
                              onKeyUp={() => {
                                trigger("surname");
                              }} />
                            <span className={`icon icon-left ${errors.surname && "text-danger input-error"}`}><i
                              className="fa fa-wrapper fa-user" aria-hidden="true" /></span>
                          </div>
                          {errors.surname && <span className="required info">{errors.surname.message}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-1 col-6 pl-0">
                        <label className="font-bold">Birthdate <span className="required">*</span></label>
                        <div className="input-control">
                          <input
                            type="date"
                            id={`birth_date`}
                            className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.birth_date && "text-danger input-error"}`}
                            placeholder="Birthdate"
                            {...register("birth_date", {required: "Birthdate is required."})}
                            onKeyUp={() => {
                              trigger("birth_date");
                            }} />
                          <span className={`icon icon-left ${errors.birth_date && "text-danger input-error"}`}>
                            <i className="fa fa-wrapper fa-calendar" />
                          </span>
                        </div>
                        {errors.birth_date && <span className="required info">{errors.birth_date.message}</span>}
                      </div>

                      <div className="mb-1 col-6 pr-0">
                        <label className="font-bold label-small">Occupation <span className="required">*</span></label>
                        <div className="input-control">
                          <input type="text"
                                 id={`occupation`}
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

                    <div className="row">
                      <div className="mb-1 col-6 pl-0">
                        <label className="font-bold">Phone Number <span className="required">*</span></label>
                        <div className="input-control">
                          <input
                            type="tel"
                            id={`phone_number`}
                            className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.phone_number && "text-danger input-error"}`}
                            placeholder="Phone Number"
                            {...register("phone_number", {required: "Phone number is required."})}
                            onKeyUp={() => {
                              trigger("phone_number");
                            }} />
                          <span className={`icon icon-left ${errors.phone_number && "text-danger input-error"}`}>
                            <i className="fa fa-wrapper fa-phone" />
                          </span>
                        </div>
                        {errors.phone_number && <span className="required info">{errors.phone_number.message}</span>}
                      </div>
                    </div>

                    <div className="mb-1">
                      <label className="font-bold">Address <span className="required">*</span></label>
                      <textarea
                        id={`address`}
                        className={`form-group-input ${errors.address && "text-danger input-error"}`}
                        placeholder="Enter your address here"
                        {...register("address", {required: "Address is required."})}
                        onKeyUp={() => {
                          trigger("address");
                        }} />
                      {errors.address && <span className="required info">{errors.address.message}</span>}
                    </div>
                    <div className="row">
                      <div className="mb-1 col-6 pl-0">
                        <div className="form-ext-control form-ext-checkbox">
                          <label className="tooltip tooltip-bottom"
                                 data-tooltip="Seven disease that have to take vaccine first.">
                            <input id="check-info" className="form-ext-input form-ext-input--info" type="checkbox"
                                   {...register("is_risk",)}
                                   onKeyUp={() => {
                                     trigger("is_risk");
                                   }}
                            />
                            <label className="form-ext-label" htmlFor="check-info">do you have any disease that risk for
                                                                                   COVID 19</label>
                          </label>
                        </div>
                      </div>
                      <div className="mb-1 col-6 pr-0">
                        <div className="btn-group u-pull-right">
                          <button id={`register__btn`} className="btn-info"
                                  type="submit">Submit
                          </button>
                        </div>
                      </div>
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