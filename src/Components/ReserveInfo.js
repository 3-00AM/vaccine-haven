import React, {useState} from 'react';
import 'cirrus-ui';
import {Button, Dialog, Pane, toaster} from "evergreen-ui";
import {BASE_URL, config} from "../utils";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {getAccessToken} from "../lib/getAccessToken";

function ReserveInfo(props) {

  const history = useHistory();
  const reservation_data = props.data
  const last_reserve = reservation_data[reservation_data.length - 1]
  const [isShown, setIsShown] = useState(false)

  const onCancel = async () => {
    await getAccessToken()
    // change this to send json
    await axios.delete(`${BASE_URL}/reservation/${last_reserve.citizen_id}`, config)
      .then(function (response) {
        const reservation_feedback = response.data.feedback
        if (reservation_feedback === "cancel reservation success!") {
          toaster.success("Cancellation Successful!", {
            id: "forbidden-action",
            description: "Latest reservation has been canceled.",
            duration: 5
          })
          history.push("/")
        } else if (reservation_feedback === "cancel reservation failed: invalid citizen ID") {
          toaster.danger("Cancellation Failed!", {
            id: "forbidden-action",
            description: "Invalid citizen ID",
            duration: 5
          })
        } else if (reservation_feedback === "cancel reservation failed: there is no reservation for this citizen") {
          toaster.danger("Cancellation Failed!", {
            id: "forbidden-action",
            description: "There is no reservation for this citizen",
            duration: 5
          })
        }
      })
      .catch(function () {
        toaster.danger("Cancellation Failed!", {
          id: "forbidden-action",
          description: "Failed to cancel.",
          duration: 5
        })
      });
  }

  return (
    <div className='col-5'>
      <div className='card h-100 u-overflow-auto'>
        <div className='card__header'>
          <p className="font-bold px-3">Vaccination Queue Information:</p>
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
          {/*<div className='row'>*/}
          {/*  <div className='col-5'>*/}
          {/*    <span>Queue: </span>*/}
          {/*  </div>*/}
          {/*  <div className='col-7'>*/}
          {/*    <span id={`reserve_queue_value`}>{last_reserve.queue}</span>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
              <span id={`reserve_time_value`}>{last_reserve.timestamp.slice(11, 16)}</span>
            </div>
          </div>
        </div>
        <div className='card__action-bar'>
          <Pane>
            <Dialog
              isShown={isShown}
              title="Cancel Reservation"
              intent="danger"
              onCloseComplete={() => setIsShown(false)}
              confirmLabel="Confirm"
              onConfirm={onCancel}
            >
              Are you sure you want to cancel the reservation?
            </Dialog>

            <Button className="btn-danger" onClick={() => setIsShown(true)}>Cancel Reservation</Button>
          </Pane>
        </div>
      </div>
    </div>
  );
}

export default ReserveInfo
