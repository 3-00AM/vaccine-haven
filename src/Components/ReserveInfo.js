import React from 'react';
import Cancel from './Cancel';
import 'cirrus-ui';

function ReserveInfo(data) {

  const reservation_data = data
  const last_reserve = reservation_data[0]


  return (
    <div className='row'>
      <div className='col-5'>
            <div className='card h-100 u-overflow-y-scroll'>
                <div className='card__header'>
                    <p className="font-bold px-3">Last Vaccine Reservation Information:</p>
                </div>
                <div className='content'>
                    <div className='row'>
                        <div className='col-5'>
                            <span>Vaccine: </span>
                        </div>
                        <div className='col-7'>
                            <span id={`reserve_vaccine_value`}>{last_reserve.vaccine_name}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>
                            <span>Site name: </span>
                        </div>
                        <div className='col-7'>
                            <span id={`reserve_site_value`}>{last_reserve.site_name}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>
                            <span>Queue: </span>
                        </div>
                        <div className='col-7'>
                            <span id={`reserve_queue_value`}>{last_reserve.queue}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>
                            <span>Date: </span>
                        </div>
                        <div className='col-7'>
                            <span id={`reserve_date_value`}>{last_reserve.timestamp.slice(0, 10)}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>
                            <span>Time: </span>
                        </div>
                        <div className='col-7'>
                            <span id={`reserve_time_value`}>{last_reserve.timestamp.slice(10, 16)}</span>
                        </div>
                    </div>
                </div>
                <div className='card__action-bar'>
                    <Cancel citizen_id={last_reserve.citizen_id} />
                </div>
            </div>
        </div>
      <div className='col-7'>
        <div className='card h-100 u-overflow-y-scroll'>
          <div className='card__header'>
            <p className="font-bold px-3">Vaccine List:</p>
          </div>
          <div className='content'>
              <ul>
                {reservation_data.map((value, index) => {
                  return (
                    <div className='row overflow'>
                      <div className='col-4'>
                        <span key={index}> Vaccine: {value.vaccine_name}</span>
                      </div>
                      <div className='col-4'>
                        <span key={index}>When: {value.timestamp.slice(0, 10)}</span>
                      </div><div className='col-4'>
                        
                        <span key={index}>Status: { value.checked == "True" ? "Vaccinated" : "Unvaccineated" }</span>
                      </div>
                    </div>
                  )
                })}
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveInfo
