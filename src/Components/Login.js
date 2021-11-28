import React, { useContext, useState } from "react";
import { AuthContext, Citizen_id } from "./Auth";
import firebase, { db } from "../config";
import { BASE_URL, config } from "../utils";
import axios from "axios";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {

  const { register, handleSubmit, setError, trigger, formState: { errors, isValid } } = useForm();
  const [citizen, setCitizenID] = useState("")
  let history = useHistory();

  const onError = (errors, e) => {
    console.log(errors, e)
    console.log(isValid)
  };

  const sentOTP = async (data, event) => {
    event.preventDefault();
    await axios.get(`${BASE_URL}/registration/${data.citizen_id}`, config).then(response => {
      let sms = `+66${response.data.phone_number.substring(1)}`
      let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container")
      firebase.auth().signInWithPhoneNumber(sms, recaptcha).then((e) => {
        let code = prompt("enter OTP");
        if (code == null) {
          return;
        }
        e.confirm(code).then((res) => {
          db.collection('users').doc(res.user.uid).set({ citizen_id: data.citizen_id })
          console.log(res, "OTP success")
        })
      })
    }).catch((e) => {
      console.log(e)
    })
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    history.push('/')
  }

  return (
    <>
      <div className="hero fullscreen">
        <Navbar />
        <div className="content">
          <div style={{ margin: "auto" }}>
            <form className="frame p-0" autoComplete="on" onSubmit={handleSubmit(sentOTP, onError)}>
              <div className="frame__body p-0">
                <div className="row p-0 level fill-height">
                  <div className="col">
                    <div className="space xlarge" />
                    <div className="padded">
                      <h1 className="u-text-center u-font-alt">Log In</h1>
                      <div className="divider" />
                      <p className="u-text-center">Login to VaccineHaven.</p>
                      <div className="divider" />

                      <div className="mb-1">
                        <label className="font-bold">Citizen ID <span className="required">*</span> <span
                          className="info inline font-light">Please input your registered real ID.</span></label>
                        <div className="section-body">
                          <div className="input-control">
                            <input
                              type="number"
                              id={'citizen_id'}
                              className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.citizen_id && "text-danger input-error"}`}
                              placeholder="Citizen ID"
                              {...register("citizen_id", {
                                required: "Citizen ID is required",
                                minLength: { value: 13, message: 'Citizen ID must be at least 13 characters long' },
                                maxLength: { value: 13, message: 'Citizen ID must be at most 13 characters long' }
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

                      <div className="space" />

                      <div className="btn-group u-pull-right">
                        <div id="recaptcha-container" />
                        <button id={`login__btn`} className="btn-success" type="submit">Login</button>
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
      <Navbar />
    </>
  )
}

export default Login;