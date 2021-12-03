import React, {useContext, useState} from "react";
import {AuthContext} from "./Auth";
import firebase, {db} from "../config";
import {BASE_URL, config, pageTransition, pageVariants} from "../utils";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toaster} from "evergreen-ui";
import {getAccessToken} from "../lib/getAccessToken";
import ThaiNationalID from "../lib/validate";
import CitizenID from "./CitizenID";
import Navbar from "./Navbar";
import {motion} from "framer-motion";

function Login() {

  const {register, handleSubmit, setError, trigger, formState: {errors}} = useForm();
  const [loading, setLoading] = useState(true)
  let history = useHistory();


  const sentOTP = async (data, event) => {
    setLoading(false)
    event.preventDefault();
    await getAccessToken()
    await axios.get(`${BASE_URL}/registration/${data.citizen_id}`, config).then(response => {
      const register_data = response.data;
      const register_feedback = register_data.feedback;
      if (register_feedback === "report failed: citizen ID is not registered") {
        setLoading(true)
        setError("citizen_id", {
          type: "manual",
          message: "This Citizen ID is not registered."
        });
        toaster.danger("Submit Failed!", {
          id: "forbidden-action",
          description: "Citizen ID is not registered.",
          duration: 5
        })
      } else {
        let sms = `+66${register_data.phone_number.substring(1)}`
        setLoading(true)
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container")
        firebase.auth().signInWithPhoneNumber(sms, recaptcha).then((e) => {
          let code = prompt("Enter OTP");
          if (code == null) {
            return;
          }
          e.confirm(code).then((res) => {
            db.collection('users').doc(res.user.uid).set({citizen_id: data.citizen_id})
            console.log(res, "OTP success")
          }).catch(() => {
            window.location.reload();
            toaster.danger("OTP Failed!", {
              id: "forbidden-action",
              description: "You entered an invalid OTP. Please try again.",
              duration: 5
            })
          })
        }).catch(() => {
          window.location.reload();
        })
      }
    }).catch(() => {
      setLoading(true)
      setError("citizen_id", {
        type: "manual",
        message: "This Citizen ID is not registered."
      });
      toaster.danger("Submit Failed!", {
        id: "forbidden-action",
        description: "Citizen ID is not registered.",
        duration: 5
      })
    })
  };

  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    history.push('/')
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Navbar headerFixed={true}/>
      <div className="row p-0">
        <div className="col-6 p-0 level">
          <div className="u-text-left w-100">
            <form className="content" autoComplete="on" onSubmit={handleSubmit(sentOTP)}>
              <h4>Vaccine Haven</h4>
              <h6 className="font-alt">Login to using Citizen ID and send OTP to your phone.</h6>

              <div className="divider" />

              <CitizenID errors={errors} useFormRegisterReturn={register("citizen_id", {
                required: "Citizen ID is required",
                minLength: {value: 13, message: 'Citizen ID must be at least 13 characters long'},
                maxLength: {value: 13, message: 'Citizen ID must be at most 13 characters long'},
                validate: value => ThaiNationalID(value) || "Invalid Citizen ID"
              })} onKeyUp={() => {
                trigger("citizen_id");
              }} />

              {loading ? <div id="recaptcha-container" className={`u-center`} /> :
                <div className="u-flex u-items-center u-justify-center">
                  <div className="animated loading loading-right u-text-right">
                    <p>loading reCAPTCHA</p>
                  </div>
                </div>
              }

              <div className="form-section u-text-right">
                <div className="m-1 u-inline-block">
                  <Link to={"/"}>
                    <button id={`cancel__btn`} type={"reset"} className="btn-light">
                      Cancel
                    </button>
                  </Link>
                </div>
                <div className="m-1 u-inline-block">
                  <button id={`login__btn`} className="btn-info" type="submit">Send OTP</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-6 p-0">
          <div id="splash-img" className="hero fullscreen hero-img" />
        </div>
      </div>
    </motion.div>
  )
}

export default Login;