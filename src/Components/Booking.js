import React from 'react'
import { useState } from 'react';
import Axios from "axios";
import { useForm } from 'react-hook-form';
import UserInformation from './UserInformation';
import {Link, useHistory} from "react-router-dom";
import 'cirrus-ui';

function Booking() {
    // const fetchUserInfo = async (citizen_id) => {
    //     const res = await fetch(`https://wcg-apis.herokuapp.com/citizen/${citizen_id}`)
    //     const data = await res.json()

    //     return data
    // }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const base_url = 'https://wcg-apis.herokuapp.com';

    const [displayInfo, setDisplayInfo] = useState(false)
    const [citizen_id, setCitizen_id] = useState('')
    let history = useHistory();

    const config = {
        method: 'get',
        url: ``,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    };

    const onSubmit = async (data, event) => {
        event.preventDefault();

        config.url = `${base_url}/registration/${data.citizen_id}`
        console.log(data.citizen_id)
        console.log(event)

        await Axios(config)
            .then(function (response) {
                data = response.data;
                console.log('data');
                console.log(data);
                console.log(data.address);
                // wait for gov and change this (can't find registered person)
                if(data.feedback === "cannot find this person") {
                    setDisplayInfo(false)
                    setCitizen_id('')
                }
                else {
                    setDisplayInfo(true)
                    setCitizen_id(data.citizen_id)
                    console.log("citizen-id" + data["citizen_id"])
                    history.push(`/queue/${data.citizen_id}`)
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    console.log(errors);

    return (
        <div>
            <h1>Booking Page</h1>
            <h1>Fix pls</h1>
            <h1>ask for id number only
                (card)
                <br />
                1. go to infopage if already register
                <br />
                2. go to register page

            </h1>
            <form className="frame p-0" method="post" autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
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
                    <button className="btn-success" type="submit">Submit</button>
            </form>
            { displayInfo &&  <UserInformation citizen_id={citizen_id}/>}
        </div>
    )
}

export default Booking
