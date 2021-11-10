import React, { useState, useEffect } from 'react';
import Cancel from './Cancel';
import Axios from "axios";
import { useForm } from 'react-hook-form';
import 'cirrus-ui';
import Navbar from "./Navbar";

function UserInformation({ citizen_id }) {
    // const { state } = this.props.location.state;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [reserveStatus, setReserveStatus] = useState(false)
    const [displayInfo, setDisplayInfo] = useState(false)
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [address, setAddress] = useState('')
    const [occupation, setOccupation] = useState('')
    const [reservation, setReservation] = useState('')
    const [surName, setSurName] = useState('')
    const base_url = 'https://wcg-apis.herokuapp.com';

    const config = {
        method: 'get',
        url: ``,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    };
    console.log(citizen_id);


    const userInfo = async () => {
        config.url = `${base_url}/registration/${citizen_id}`
        Axios(config)
            .then(function (response) {
                // console.log(response.data.citizen_id);
                const data = response.data;
                console.log('data');
                console.log(data);
                console.log(data.address);
                // wait for gov and change this (can't find registered person)
                if (data.feedback === "cannot find this person") {
                    console.log('false');
                    setDisplayInfo(false)
                    // setCitizen_id('')
                }
                else {
                    setDisplayInfo(true)
                    setId(data.citizen_id);
                    setFirstName(data.name);
                    setSurName(data.surname);
                    setBirthDate(data.birth_date);
                    setAddress(data.address);
                    setOccupation(data.occupation);
                    console.log(data.vaccine_taken)

                    // if (data.vaccine_taken === null){
                    setReservation('Not reservation yet')
                    // }
                    // else{
                    // setReservation(data.vaccine_taken);
                    // }
                    console.log(address)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    };
    console.log(errors);

    const reserveInfo = async () => {
        config.url = `${base_url}/reservation`
        Axios(config)
            .then(function (response) {
                // console.log(response.data.citizen_id);
                const info = response.data;
                console.log('data');
                console.log(info);
                // console.log(data.address);
                // wait for gov and change this (can't find registered person)
                // if (data.feedback === "cannot find this person") {
                //     console.log('false');
                //     setDisplayInfo(false)
                //     // setCitizen_id('')
                // }
                // else {

                // }
            })
    };

    return (
        <div className="Info">
            {/* <Navbar/> */}
            <div class="px-15 py-2 mx-5">
                <div class='row'>
                    <div class='col-6'>
                        <div class="card">
                            <userInfo/>
                            <div class="card__header">
                                <p class="font-bold px-3">User information:</p>
                            </div>
                            <div class='content'>
                                <p>Name: {firstName} {surName}</p>
                                <p>Citizen ID: {citizen_id}</p>
                                <p>Birth day: {birthDate}</p>
                                <p>Occupation: {occupation}</p>
                                <p>Address: {address}</p>
                            </div>
                            <div class='card__footer level content'>
                            </div>
                        </div>
                    </div>
                    <div class='col-6'>
                        <div class='card'>
                            <div class='card__header'>
                                <p class="font-bold px-3">Vaccine Reservation Information:</p>
                            </div>
                            <div class='content'>
                                <p>Vaccine: {reservation}</p>
                            </div>
                            <div class='card__footer level content'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Cancel citizen_id={id} />
        </div >
    );
}

export default UserInformation
