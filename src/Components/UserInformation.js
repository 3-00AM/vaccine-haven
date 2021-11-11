import React, { useState, useEffect } from 'react';
import Cancel from './Cancel';
import Axios from "axios";
import 'cirrus-ui';
import Navbar from "./Navbar";
import { useParams } from 'react-router';
import axios from 'axios';

function UserInformation(props) {

  const data = props.location.state
  const base_url = 'https://wcg-apis.herokuapp.com';

  const config = {
    method: 'get',
    url: ``,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };
  console.log(data.citizen_id);

  const reserveInfo = async () => {
    console.log('dataanpm ');
    config.url = `${base_url}/reservation/${data.citizen_id}`
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

  setInterval(() => {
    reserveInfo();
    console.log("interval")
  }, 10000);

  return (
    <div className="fullscreen bg-indigo-200">
      <Navbar />
      <div class="px-1 py-6 mx-2">
        <div class='row'>
          <div class='col-6'>
            <div class="card">
              <div class="card__header">
                <p class="font-bold px-3">User information:</p>
              </div>
              <div class='card__footer level content'>
              </div>
              <div class='content'>
                <div class='row'>
                  <div class='col-5'>
                    <span>Name: </span>
                  </div>
                  <div class='col-7'>
                    <span>{data.name} {data.surname}</span>
                  </div>
                </div>
                <div class='row'>
                  <div class='col-5'>
                    <span>Citizen ID: </span>
                  </div>
                  <div class='col-7'>
                    <span>{data.citizen_id}</span>
                  </div>
                </div>
                <div class='row'>
                  <div class='col-5'>
                    <span>Birth day: </span>
                  </div>
                  <div class='col-7'>
                    <span>{data.birth_date}</span>
                  </div>
                </div>
                <div class='row'>
                  <div class='col-5'>
                    <span>Occupation: </span>
                  </div>
                  <div class='col-7'>
                    <span>{data.occupation}</span>
                  </div>
                </div>
                <div class='row'>
                  <div class='col-5'>
                    <span>Address: </span>
                  </div>
                  <div class='col-7'>
                    <span>{data.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='row col'>
            <div class='grid-r-8'>
              <div class='card'>
                <div class='card__header'>
                  <p class="font-bold px-3">Vaccine Reservation Information:</p>
                </div>
                <div class='content'>
                  <div class='row'>
                    <div class='col-5'>
                      <span>Vaccine: </span>
                    </div>
                    <div class='col-7'>
                      <span>Sinopharm</span>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-5'>
                      <span>Stie name: </span>
                    </div>
                    <div class='col-7'>
                      <span>OGYH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='grid-r-6'>
              <div class='card'>
                <div class='card__header'>
                  <p class="font-bold px-3">Vaccine Taken:</p>
                </div>
                <div class='card__footer level content'>
                </div>
                <div class='content'>
                <div class='row'>
                    <div class='col-5'>
                      <span>AstraZeneca: </span>
                    </div>
                    <div class='col-7'>
                      <span>1</span>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-5'>
                      <span>Sinopharm: </span>
                    </div>
                    <div class='col-7'>
                      <span>1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Cancel citizen_id={data.citizen_id} />
      </div>
    </div >
  );
}

export default UserInformation
