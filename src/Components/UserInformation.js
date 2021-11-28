import React from 'react';
import Cancel from './Cancel';
import Axios from "axios";
import 'cirrus-ui';
import Navbar from "./Navbar";
import {BASE_URL} from "../utils";

function UserInformation(props) {

  const state = props.location.state
  const register_data = state.register_data;

  let reservation_data;
  if (state.reservation_data.length > 0) {
    reservation_data = state.reservation_data[0];
  } else
    reservation_data = {
      citizen_id: "",
      site_name: "",
      vaccine_name: "",
      timestamp: "",
      queue: "",
      checked: ""
    }


  const config = {
    method: 'get',
    url: ``,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };
  console.log(register_data.citizen_id);


  // const reserveInfo = async () => {
  //   console.log('data');
  //   config.url = `${BASE_URL}/reservation/${data.citizen_id}`
  //   Axios(config)
  //     .then(function (response) {
  //       // console.log(response.data.citizen_id);
  //       const info = response.data;
  //       console.log('data');
  //       console.log(info);
  //       // console.log(data.address);
  //       // wait for gov and change this (can't find registered person)
  //       // if (data.feedback === "cannot find this person") {
  //       //     console.log('false');
  //       //     setDisplayInfo(false)
  //       //     // setCitizen_id('')
  //       // }
  //       // else {
  //
  //       // }
  //     })
  // };
  //
  // setInterval(() => {
  //   reserveInfo();
  //   console.log("interval")
  // }, 10000);

  return (
    <div className="bg-indigo-200">
      <Navbar />
      <div className="px-1 py-10 mx-2">
        <div className='row'>
          <div className='col-12'>
            <div className="card">
              <div className="card__header">
                <p className="font-bold px-3">User information:</p>
              </div>
              <div className='card__footer level content'>
              </div>
              <div className='content'>
                <div className='row'>
                  <div className='col-5'>
                    <span>Name: </span>
                  </div>
                  <div className='col-7'>
                    <span>{register_data.name} {register_data.surname}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Citizen ID: </span>
                  </div>
                  <div className='col-7'>
                    <span>{register_data.citizen_id}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Birth day: </span>
                  </div>
                  <div className='col-7'>
                    <span>{register_data.birth_date}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Occupation: </span>
                  </div>
                  <div className='col-7'>
                    <span>{register_data.occupation}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Phone Number: </span>
                  </div>
                  <div className='col-7'>
                    <span>{register_data.phone_number}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Risk: </span>
                  </div>
                  <div className='col-7'>
                    <span>{register_data.is_risk}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Address: </span>
                  </div>
                  <div className='col-7'>
                    <span>{register_data.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='card'>
              <div className='card__header'>
                <p className="font-bold px-3">Vaccine Reservation Information:</p>
              </div>
              <div className='content'>
                <div className='row'>
                  <div className='col-5'>
                    <span>Vaccine: </span>
                  </div>
                  <div className='col-7'>
                    <span id={`reserve_vaccine_value`}>{reservation_data.vaccine_name}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Stie name: </span>
                  </div>
                  <div className='col-7'>
                    <span id={`reserve_site_value`}>{reservation_data.site_name}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Queue: </span>
                  </div>
                  <div className='col-7'>
                    <span id={`reserve_queue_value`}>{reservation_data.queue}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Date: </span>
                  </div>
                  <div className='col-7'>
                    <span id={`reserve_date_value`}>{reservation_data.timestamp}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Time: </span>
                  </div>
                  <div className='col-7'>
                    <span id={`reserve_time_value`}>{reservation_data.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
            <Cancel citizen_id={reservation_data.citizen_id} />
          </div>
          <div className='col-6'>
            <div className='card'>
              <div className='card__header'>
                <p className="font-bold px-3">Vaccine Taken:</p>
              </div>
              <div className='card__footer level content'>
              </div>
              <div className='content'>
                <div className='row'>
                  <div className='col-5'>
                    <span>AstraZeneca: </span>
                  </div>
                  <div className='col-7'>
                    <span>1</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Sinopharm: </span>
                  </div>
                  <div className='col-7'>
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<h2>add tap for this three part</h2>*/}
      </div>
    </div>
  );
}

export default UserInformation
