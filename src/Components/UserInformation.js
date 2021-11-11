import React from 'react';
import Cancel from './Cancel';
import Axios from "axios";
import 'cirrus-ui';
import Navbar from "./Navbar";

function UserInformation(props) {

  const data = props.location.state
  const base_url = 'https://wcg-apis.herokuapp.com';

  // wait for reservation api
  console.log(data)
  const reserve = data.reservation_data;
  console.log(reserve)

  const config = {
    method: 'get',
    url: ``,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };
  console.log(data.citizen_id);


  // const reserveInfo = async () => {
  //   console.log('dataanpm ');
  //   config.url = `${base_url}/reservation/${data.citizen_id}`
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

  //       // }
  //     })
  // };

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
                    <span>{data.name} {data.surname}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Citizen ID: </span>
                  </div>
                  <div className='col-7'>
                    <span>{data.citizen_id}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Birth day: </span>
                  </div>
                  <div className='col-7'>
                    <span>{data.birth_date}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Occupation: </span>
                  </div>
                  <div className='col-7'>
                    <span>{data.occupation}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Address: </span>
                  </div>
                  <div className='col-7'>
                    <span>{data.address}</span>
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
                    <span>{reserve.vaccine_name}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Stie name: </span>
                  </div>
                  <div className='col-7'>
                    <span>{reserve.site_name}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Queue: </span>
                  </div>
                  <div className='col-7'>
                    <span>{reserve.queue}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Date: </span>
                  </div>
                  <div className='col-7'>
                    <span>{reserve.timestamp}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-5'>
                    <span>Time: </span>
                  </div>
                  <div className='col-7'>
                    <span>{reserve.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
            <Cancel citizen_id={data.citizen_id} />
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
        <h2>add tap for this three part</h2>
      </div>
    </div>
  );
}

export default UserInformation
