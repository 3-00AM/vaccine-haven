import "cirrus-ui";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import Navbar from "./Navbar";
import {toaster} from "evergreen-ui";
import {BASE_URL, config} from "../utils";
import {AuthContext} from "./Auth";
import {db} from "../config";
import CitizenID from "./CitizenID";
import ThaiNationalID from "../lib/validate";
import LoadingPage from "./LoadingPage";
import {getAccessToken} from "../lib/getAccessToken";


function Reserve() {

  const {register, handleSubmit, trigger, setError, formState: {errors, isValid}} = useForm();
  const [site] = useState([<option value="" disabled selected={true}>Choose Site...</option>])
  const [loading, setLoading] = useState(false)
  const [citizen, setCitizenID] = useState("")
  const {currentUser} = useContext(AuthContext);
  let history = useHistory();
  if (currentUser) {
    db.collection('users').doc(currentUser.uid).get().then(doc => {
      setCitizenID(doc.data().citizen_id)
    })
  } else {
    history.push("/login")
  }

  const onError = (errors, e) => {
    console.log(errors, e)
    console.log(isValid)
  };

  useEffect(async () => {
    await axios.get('https://ogyh-backend-dev.herokuapp.com/api/sites', config)
      .then(r => {
        for (const ele of r.data) {
          site.push(<option value={ele.name}>{ele.name}</option>)
        }
        setLoading(true)
      })
  }, [])


  const onSubmit = async (data, event) => {
    event.preventDefault();
    await getAccessToken()
    config.params = data;

    await axios.post(`${BASE_URL}/reservation?citizen_id=${citizen}`, null, config)
      .then(function (response) {
        let res_data = response.data;
        let feedback = res_data.feedback;
        if (feedback === "reservation success!") {
          history.push("/");
          toaster.success("Reservation Successful!", {
            id: "forbidden-action",
            description: "Now you can proceed to my-info page for additional information.",
            duration: 5,
            zIndex: 100
          })
        } else if (feedback === "reservation failed: citizen ID is not registered") {
          setError("citizen_id", {
            type: "manual",
            message: "This Citizen ID is not registered."
          })
          toaster.danger("Reservation Failed!", {
            id: "forbidden-action",
            description: "Citizen ID is not registered.",
            duration: 5,
            zIndex: 100
          })
        } else if (feedback === "reservation failed: there is already a reservation for this citizen") {
          setError("citizen_id", {
            type: "manual",
            message: "This Citizen ID already reserved."
          })
          toaster.danger("Reservation Failed!", {
            id: "forbidden-action",
            description: "There is already a reservation for this citizen.",
            duration: 5,
            zIndex: 100
          })
        }
      })
      .catch(function (error) {
        toaster.danger("Reservation Failed!", {
          id: "forbidden-action",
          description: "Something went wrong!",
          duration: 5,
          zIndex: 100
        })
        console.log(error);
      });
  };


  function getReserve() {
    return (
      <div className="fullscreen background__blue">
        <Navbar />
        <div className="card content" style={{background: "white"}}>
          <div style={{margin: "auto"}}>
            <form className="frame p-0" method="post" autoComplete="on" onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="frame__body p-0">
                <div className="row p-0 level fill-height">
                  <div className="col">
                    <div className="space" />
                    <div className="padded">
                      <h1 className="u-text-center u-font-alt">Vaccine Reservation</h1>
                      <div className="divider" />
                      <p className="u-text-center">Get the user information for who want to reserve the vaccine</p>
                      <div className="divider" />

                      <CitizenID disabled errors={errors} useFormRegisterReturn={register("citizen_id", {
                        required: "Citizen ID is required",
                        minLength: {value: 13, message: 'Citizen ID must be at least 13 characters long'},
                        maxLength: {value: 13, message: 'Citizen ID must be at most 13 characters long'},
                        validate: value => ThaiNationalID(value) || "Invalid Citizen ID"
                      })} onKeyUp={() => {
                        trigger("citizen_id");
                      }} />

                      <div className="row">
                        <div className="mb-1 col-6 pl-0">
                          <label className="font-bold">Choose Site<span className="required">*</span></label>
                          <select
                            className="select"
                            id={`site_name`}
                            placeholder="Choose Site"
                            {...register("site_name", {required: "Site Name is required."})}
                            onClick={() => {
                              trigger("site_name");
                            }}>
                            {site}
                          </select>
                          {errors.site_name && <span className="required info">{errors.site_name.message}</span>}
                        </div>
                        <div className="mb-1 col-6 pr-0">
                          <label className="font-bold label-small">Choose Vaccine<span
                            className="required">*</span></label>
                          <select
                            id={`vaccine_name`}
                            className="select"
                            placeholder="Choose Vaccine"
                            {...register("vaccine_name", {required: "Vaccine Name is required."})}
                            onClick={() => {
                              trigger("vaccine_name");
                            }}>
                            <option value="" disabled selected={true}>Choose Vaccine...</option>
                            <option value="Pfizer">Pfizer</option>
                            <option value="Astra">Astra</option>
                            <option value="Sinopharm">Sinopharm</option>
                            <option value="Sinovac">Sinovac</option>
                          </select>
                          {errors.vaccine_name && <span className="required info">{errors.vaccine_name.message}</span>}
                        </div>
                      </div>

                      <div className="space" />

                      <div className="btn-group u-pull-right">
                        <button id={`reserve__btn`} className="btn-info"
                                type="submit">Submit
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

  return loading ? getReserve() : LoadingPage();
}

export default Reserve;