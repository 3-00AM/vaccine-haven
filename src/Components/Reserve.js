import "cirrus-ui";
import React, {useState} from "react";
import Axios from "axios";
import {useForm} from "react-hook-form";

function Reserve() {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const base_url = 'https://wcg-apis.herokuapp.com/reservation';

  const config = {
    method: 'post',
    url: ``,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();

    config.url = `${base_url}?citizen_id=${data.citizen_id}&site_name=${data.site_name}&vaccine_name=${data.vaccine_name}`

    await Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(errors);


  return (
    <div className="hero fullscreen">
      <div className="content">
        <div style={{margin: "auto"}}>
          <form className="frame p-0" method="post" autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
            <div className="frame__body p-0">
              <div className="row p-0 level fill-height">
                <div className="col">
                  <div className="space xlarge" />
                  <div className="padded">
                    <h1 className="u-text-center u-font-alt">Vaccine Reservation</h1>
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
                                 placeholder="Citizen ID" {...register("citizen_id", {
                            required: true,
                            minLength: 13,
                            maxLength: 13
                          })} />
                          <span className="icon icon-left"><i
                            className={`fa fa-wrapper fa-id-card ${errors.citizen_id && "text-danger input-error"}`}
                            aria-hidden="true" /></span>
                        </div>
                      </div>
                      {errors.citizen_id?.type === 'required' &&
                      <span className="required info">Citizen ID is required.</span>}
                      {errors.citizen_id?.type === 'minLength' &&
                      <span className="required info">Citizen ID must be at least 13 characters long</span>}
                      {errors.citizen_id?.type === 'maxLength' &&
                      <span className="required info">Citizen ID must be at most 13 characters long</span>}
                    </div>

                    <div className="row">
                      <div className="mb-1 col-6 pl-0">
                        <label className="font-bold">Choose Site <span className="required">*</span></label>
                        <select className="select"
                                placeholder="Choose Site" {...register("site_name", {required: true})}>
                          <option value="" disabled defaultValue>Choose Site...</option>
                          <option value="OGYHSite">OGYHSite</option>
                        </select>
                        {errors.site_name?.type === 'required' &&
                        <span className="required info">Site Name is required.</span>}
                      </div>
                      <div className="mb-1 col-6 pr-0">
                        <label className="font-bold label-small">Choose Vaccine <span
                          className="required">*</span></label>
                        <select className="select"
                                placeholder="Choose Vaccine" {...register("vaccine_name", {required: true})}>
                          <option value="" disabled defaultValue>Choose Vaccine...</option>
                          <option value="Pfizer">Pfizer</option>
                          <option value="Astra">Astra</option>
                          <option value="Sinopharm">Sinopharm</option>
                          <option value="Sinovac">Sinovac</option>
                        </select>
                        {errors.vaccine_name?.type === 'required' &&
                        <span className="required info">Vaccine Name is required.</span>}
                      </div>
                    </div>

                    <div className="space" />

                    <div className="btn-group u-pull-right">
                      <button className="btn-info">Send</button>
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

export default Reserve;