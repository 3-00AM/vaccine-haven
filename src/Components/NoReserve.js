import React from 'react';
import 'cirrus-ui';
import { Link } from "react-router-dom";

function NoReserve(data) {

  const reservation_data = data

  console.log(reservation_data.vaccine_name);

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card h-90'>
          <div className='card__header'>
            <p className="font-bold px-3">Vaccine Reservation Information:</p>
          </div>
          <div className='content'>
            <p>You have not reserve vaccine yet!</p>
          </div>
          <div className='btn'>
            <Link to={'/reservation'}>Reservation</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoReserve
