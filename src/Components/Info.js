import React from 'react'
import axios from "axios";
import {useForm} from 'react-hook-form';
import {useHistory} from "react-router-dom";
import 'cirrus-ui';
import Navbar from "./Navbar";
import {toaster} from "evergreen-ui";
import {config} from "../utils";

function Info() {
  const {register, handleSubmit, setError, trigger, formState: {errors}} = useForm();
  const base_url = 'https://wcg-apis.herokuapp.com';
  let history = useHistory();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data.citizen_id)
    console.log(event)

    await axios.all([
      axios.get(`${base_url}/registration/${data.citizen_id}`, config),
      axios.get(`${base_url}/reservation/${data.citizen_id}`, config)
    ])
      .then(axios.spread((reg, reservation) => {
        const register_data = reg.data;
        const reservation_data = reservation.data;
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
          history.push(`/info/${register_data.citizen_id}`, {register_data, reservation_data})
        }
      }))
      .catch(function (error) {
        toaster.danger("Submit Failed!", {
          id: "forbidden-action",
          description: "Please make sure you already registered.",
          duration: 5,
          zIndex: 100
        })
        console.log(error)
      })
  };
  console.log(errors);

  return (
    <div className="hero fullscreen">
      <Navbar />
      <div className="content">
        <div style={{margin: "auto"}}>
          <form className="frame p-0" method="post" autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
            <div className="frame__body p-0">
              <div className="row p-0 level fill-height">
                <div className="col">
                  <div className="space xlarge" />
                  <div className="padded">
                    <h1 className="u-text-center u-font-alt">Citizen Page</h1>
                    <div className="divider" />
                    <p className="u-text-center">See your information about vaccine reservation.</p>
                    <div className="divider" />

                    <div className="mb-1">
                      <label className="font-bold">Citizen ID <span className="required">*</span> <span
                        className="info inline font-light">Please input your real ID.</span></label>
                      <div className="section-body">
                        <div className="input-control">
                          <input
                            type="number"
                            id={'citizen_id'}
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

                    <div className="space" />

                    <div className="btn-group u-pull-right">
                      <button id={`info__btn`} className="btn-success" type="submit">Submit</button>
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
  )
}

export default Info
