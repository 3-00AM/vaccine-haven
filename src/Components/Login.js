import React, {useContext} from "react";
import {AuthContext} from "./Auth";
import firebase, {db} from "../config";
import {BASE_URL, config} from "../utils";
import axios from "axios";
import Navbar from "./Navbar";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import CitizenID from "./CitizenID";
import {toaster} from "evergreen-ui";

import ThaiNationalID from "../lib/validate";

function Login() {

  const {register, handleSubmit, setError, trigger, formState: {errors, isValid}} = useForm();
  let history = useHistory();

  const onError = (errors, e) => {
    console.log(errors, e)
    console.log(isValid)
  };

  const sentOTP = async (data, event) => {
    event.preventDefault();
    await axios.get(`${BASE_URL}/registration/${data.citizen_id}`, config).then(response => {
      const register_data = response.data;
      const register_feedback = register_data.feedback;
      if (register_feedback === "report failed: citizen ID is not registered") {
        setError("citizen_id", {
          type: "manual",
          message: "This Citizen ID is not registered."
        });
        toaster.danger("Submit Failed!", {
          id: "forbidden-action",
          description: "Citizen ID is not registered.",
          duration: 5,
          zIndex: 100
        })
      } else {
        let sms = `+66${register_data.phone_number.substring(1)}`
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container")
        firebase.auth().signInWithPhoneNumber(sms, recaptcha).then((e) => {
          let code = prompt("enter OTP");
          if (code == null) {
            return;
          }
          e.confirm(code).then((res) => {
            db.collection('users').doc(res.user.uid).set({citizen_id: data.citizen_id})
            console.log(res, "OTP success")
          })
        })
      }
    }).catch((e) => {
      setError("citizen_id", {
        type: "manual",
        message: "This Citizen ID is not registered."
      });
      toaster.danger("Submit Failed!", {
        id: "forbidden-action",
        description: "Citizen ID is not registered.",
        duration: 5,
        zIndex: 100
      })
      console.log(e)
    })
  };

  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    history.push('/')
  }

  return (
    <>
      <div className="fullscreen background__blue">
        <Navbar />
        <div className="card content" style={{background: "white"}}>
          <div style={{margin: "auto"}}>
            <form className="frame p-0" autoComplete="on" onSubmit={handleSubmit(sentOTP, onError)}>
              <div className="frame__body p-0">
                <div className="row p-0 level fill-height">
                  <div className="col">
                    <div className="space xlarge" />
                    <div className="padded">
                      <h1 className="u-text-center u-font-alt">Log In</h1>
                      <div className="divider" />
                      <p className="u-text-center">Login to using Citizen ID and send OTP to your phone.</p>
                      <div className="divider" />

                      <CitizenID errors={errors} useFormRegisterReturn={register("citizen_id", {
                        required: "Citizen ID is required",
                        minLength: {value: 13, message: 'Citizen ID must be at least 13 characters long'},
                        maxLength: {value: 13, message: 'Citizen ID must be at most 13 characters long'},
                        validate: value => ThaiNationalID(value) || "Invalid Citizen ID"
                      })} onKeyUp={() => {
                        trigger("citizen_id");
                      }} />

                      <div className="space" />

                      <div id="recaptcha-container" className={`u-center`} />

                      <div className="btn-group u-pull-right">
                        <button id={`login__btn`} className="btn-success" type="submit">Send OTP</button>
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
    </>
  )
}

export default Login;