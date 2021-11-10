import React, { useState, useEffect } from 'react';
import Cancel from './Cancel';
import Axios from "axios";
import { useForm } from 'react-hook-form';
import 'cirrus-ui';
import Navbar from "./Navbar";
import { useParams } from 'react-router';

function UserInformation() {
  // const { state } = this.props.location.state;

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [reserveStatus, setReserveStatus] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);

  const { citizen_id } = useParams();
  const [data, setData] = useState([]);

  // const [id, setId] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [birthDate, setBirthDate] = useState('');
  // const [address, setAddress] = useState('');
  // const [occupation, setOccupation] = useState('');
  // const [reservation, setReservation] = useState('');
  // const [surName, setSurName] = useState('');
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
    console.log("ci" + citizen_id);
    await Axios(config)
      .then(function (response) {
        if (response.data.feedback === "cannot find this person") {
          console.log('false');
          setDisplayInfo(false)
        }
        else {
          console.log(response.data);
          setData(response.data);
          console.log(data);

          // if (data.vaccine_taken === null){
          // setReservation('Not reservation yet')
          // }
          // else{
          // setReservation(data.vaccine_taken);
          // }
          console.log(data.address)
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  };
  userInfo();

  console.log(errors);

  // const reserveInfo = async () => {
  //     config.url = `${base_url}/reservation`
  //     Axios(config)
  //         .then(function (response) {
  //             // console.log(response.data.citizen_id);
  //             const info = response.data;
  //             console.log('data');
  //             console.log(info);
  //             // console.log(data.address);
  //             // wait for gov and change this (can't find registered person)
  //             // if (data.feedback === "cannot find this person") {
  //             //     console.log('false');
  //             //     setDisplayInfo(false)
  //             //     // setCitizen_id('')
  //             // }
  //             // else {

  //             // }
  //         })
  // };

  return (
    <div className="Info">
      {/* <Navbar/> */}
      <div class="px-15 py-2 mx-5">
        <div class='row'>
          <div class='col-6'>
            <div class="card">
              <div class="card__header">
                <p class="font-bold px-3">User information:</p>
              </div>
              <div class='content'>
                <p>Name: {data.name} {data.surname}</p>
                <p>Citizen ID: {data.citizen_id}</p>
                <p>Birth day: {data.birth_date}</p>
                <p>Occupation: {data.occupation}</p>
                <p>Address: {data.address}</p>
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
                <p>Vaccine: </p>
              </div>
              <div class='card__footer level content'>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cancel citizen_id={citizen_id} />
    </div >
  );
}

export default UserInformation
