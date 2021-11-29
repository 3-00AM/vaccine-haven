import React from 'react';
import 'cirrus-ui';
import Navbar from "./Navbar";
import NoReserve from './NoReserve';
import ReserveInfo from './ReserveInfo';

function UserInformation(props) {

  const state = props.location.state
  const register_data = state.register_data;
  let is_reserve = false;

  let reservation_data;
  if (state.reservation_data.length > 0) {
    is_reserve = true;
    reservation_data = state.reservation_data;
  } else
    reservation_data = {
      citizen_id: "",
      site_name: "",
      vaccine_name: "",
      timestamp: "",
      queue: "",
      checked: ""
    }

  // const config = {
  //   method: 'get',
  //   url: ``,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   }
  // };
  console.log(register_data.citizen_id);
  console.log(is_reserve)

  return (
    <div className="bg-indigo-200">
      <Navbar />
      <div className="px-1 py-10 mx-2">
        <div className='col-12'>
          <div className="card h-100 u-overflow-y-scroll">
            <div className="card__header">
              <p className="font-bold px-3">User information:</p>
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
        {is_reserve ? ReserveInfo(reservation_data) : NoReserve(reservation_data)}
      </div>
    </div>
  );
}

export default UserInformation
