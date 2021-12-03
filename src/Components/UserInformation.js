import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import 'cirrus-ui';
import Navbar from "./Navbar";
import {useHistory} from "react-router-dom";
import {toaster} from 'evergreen-ui';
import {BASE_URL, config} from "../utils";
import {AuthContext} from "./Auth";
import {db} from "../config";
import LoadingPage from "./LoadingPage";
import NoReserve from './NoReserve';
import ReserveInfo from './ReserveInfo';
import {getAccessToken} from "../lib/getAccessToken";
import {motion} from "framer-motion"
import {pageTransition, pageVariants} from "../utils";


function UserInformation() {
  let [isReserve, setIsReserve] = useState(false);
  const [register_data, set_register_data] = useState();
  const [reservation_data, set_reservation_data] = useState();
  const [loading, setLoading] = useState(false)
  const {currentUser} = useContext(AuthContext);
  const history = useHistory();

  const getInfo = async (c) => {
    await getAccessToken()
    await axios.all([
      axios.get(`${BASE_URL}/registration/${c}`, config),
      axios.get(`${BASE_URL}/reservation/${c}`, config)
    ])
      .then(axios.spread((register, reservation) => {
        const res_register_data = register.data;
        const res_reservation_data = reservation.data;
        const register_feedback = res_register_data.feedback;
        if (register_feedback === "report failed: citizen ID is not registered") {
          toaster.danger("Submit Failed!", {
            id: "forbidden-action",
            description: "Citizen ID is not registered.",
            duration: 5
          })
        } else {
          set_register_data(res_register_data)
          if (res_reservation_data.length > 0) {
            setIsReserve(true)
            set_reservation_data(res_reservation_data);
          } else {
            setIsReserve(false)
          }
        }
        setLoading(true)
      }))
      .catch(function () {
        toaster.danger("Submit Failed!", {
          id: "forbidden-action",
          description: "Please make sure you already registered.",
          duration: 5
        })
      })
  };

  useEffect(() => {
    if (currentUser) {
      db.collection('users').doc(currentUser.uid).get().then(doc => {
        getInfo(doc.data().citizen_id).then(() => {
        })
      })
    } else {
      history.push("/login")
    }
  }, [])

  function getVaccineList() {
    return <>
      {reservation_data.map((value, index) => {
        return (
          <div className='row overflow'>
            <div className='col-4'>
              <span key={index}> Vaccine: {value.vaccine_name}</span>
            </div>
            <div className='col-4'>
                      <span
                        key={index}>Date: {value.queue.slice(0, 10)}</span>
            </div>
            <div className='col-4'>

              <span key={index}>Status: {value.checked === "True" ? "Vaccinated" : "Unvaccineated"}</span>
            </div>
          </div>
        )
      })}
    </>;
  }

  function getContent() {
    return (
      <motion.div
        className="background__blue"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Navbar />
        <div className="px-1 mx-2">
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
            {(isReserve && reservation_data[reservation_data.length - 1].checked === "False") ?
              <ReserveInfo data={reservation_data} /> :
              <NoReserve data={reservation_data} />}
            <div className='col-7'>
              <div className='card h-100 u-overflow-auto'>
                <div className='card__header'>
                  <p className="font-bold px-3">Vaccination Information:</p>
                </div>
                <div className='content'>
                  <ul>

                    {isReserve ? getVaccineList() :
                      <>
                        <div className="u-center">
                          <p>Not Taken any Vaccine yet.</p>
                        </div>
                      </>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space xlarge" />
      </motion.div>
    );
  }

  return loading ? getContent() : LoadingPage();
}

export default UserInformation
