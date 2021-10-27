import "cirrus-ui";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";
import Modal from "./Modal"

function Register() {

  const {register, handleSubmit, formState: {errors}} = useForm();

  // const citizen_id = <LongInputs label={`Citizen ID`} info={`Please input your real ID.`} register={register}
  //                                errors={errors.citizen_id} data={`citizen_id`}
  //                                options={{required: true, minLength: 13, maxLength: 13}}
  //                                errors_info={<>{errors.citizen_id?.type === 'required' &&
  //                                <span className="required info">Citizen ID is required.</span>}
  //                                  {errors.citizen_id?.type === 'minLength' &&
  //                                  <span
  //                                    className="required info">Citizen ID must be at least 13 characters long</span>}
  //                                  {errors.citizen_id?.type === 'maxLength' &&
  //                                  <span
  //                                    className="required info">Citizen ID must be at most 13 characters long</span>}</>}
  //                                isRequried={true} />

  const base_url = 'https://wcg-apis.herokuapp.com/registration';

  const config = {
    method: 'post',
    url: ``,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();

    config.url = `${base_url}?name=${data.firstname}&surname=${data.lastname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}`

    await Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(errors);

  const [modal, setModal] = useState(false);
  const close = () => setModal(false);
  const open = () => setModal(true);

  useEffect(() => {
    document.addEventListener('keyup', function (e) {
      if (e.key === "Escape") {
        const modals = document.querySelectorAll('.modal-overlay');
        for (const modal of modals) {
          modal.click();
        }
      }
    });
  })

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

                    <div className="mb-1">
                      <div className="section-body row">
                        <div className="col-6 pl-0">
                          <label className="font-bold">Firstname <span className="required">*</span></label>
                          <div className="input-control">
                            <input
                              className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.firstname && "text-danger input-error"}`}
                              type="text" placeholder="Firstname" {...register("firstname", {required: true})} />
                            <span className={`icon icon-left ${errors.firstname && "text-danger input-error"}`}><i
                              className="fa fa-wrapper fa-user" aria-hidden="true" /></span>
                          </div>
                          {errors.firstname?.type === 'required' &&
                          <span className="required info">First name is required.</span>}

                        </div>

                        <div className="col-6 pr-0">
                          <label className="font-bold">Lastname <span className="required">*</span></label>
                          <div className="input-control">
                            <input
                              className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.lastname && "text-danger input-error"}`}
                              type="text" placeholder="Lastname" {...register("lastname", {required: true})} />
                            <span className={`icon icon-left ${errors.lastname && "text-danger input-error"}`}><i
                              className="fa fa-wrapper fa-user" aria-hidden="true" /></span>
                          </div>
                          {errors.lastname?.type === 'required' &&
                          <span className="required info">Last name is required.</span>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-1 col-6 pl-0">
                        <label className="font-bold">Birthdate <span className="required">*</span></label>
                        <div className="input-control">
                          <input type="date"
                                 className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.birthdate && "text-danger input-error"}`}
                                 placeholder="Birthdate" {...register("birthdate", {required: true})} />
                          <span className={`icon icon-left ${errors.birthdate && "text-danger input-error"}`}>
                            <i className="fa fa-wrapper fa-calendar" />
                          </span>
                        </div>
                        {errors.birthdate?.type === 'required' &&
                        <span className="required info">Birthdate is required.</span>}
                      </div>

                      <div className="mb-1 col-6 pr-0">
                        <label className="font-bold label-small">Occupation <span className="required">*</span></label>
                        <div className="input-control">
                          <input type="text"
                                 className={`input-contains-icon input-contains-icon input-contains-icon-left ${errors.occupation && "text-danger input-error"}`}
                                 placeholder="Occupation" {...register("occupation", {required: true})} />
                          <span className={`icon icon-left ${errors.occupation && "text-danger input-error"}`}>
                            <i className="fa fa-wrapper fa-briefcase" />
                          </span>
                        </div>
                        {errors.occupation?.type === 'required' &&
                        <span className="required info">Occupation is required.</span>}
                      </div>
                    </div>

                    <div className="mb-1">
                      <label className="font-bold">Address <span className="required">*</span></label>
                      <textarea className={`form-group-input ${errors.address && "text-danger input-error"}`}
                                placeholder="Enter your address here" {...register("address", {required: true})} />
                      {errors.address?.type === 'required' &&
                      <span className="required info">Address is required</span>}
                    </div>

                    <div className="space" />

                    <div className="btn-group u-pull-right">
                      <Link to="/">
                      <button onClick={modal ? close : open} className="btn-info" type="submit">Next</button>
                      </Link>
                    </div>

                    {modal && <Modal title="VaccineHaven" topic="Register Vaccine" close={close}>
                      This is Modal content
                    </Modal>}

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