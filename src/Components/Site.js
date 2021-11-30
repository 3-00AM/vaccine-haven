import React, {useEffect, useState} from 'react';
import 'cirrus-ui';
import axios from "axios";
import Navbar from "./Navbar";
import LoadingPage from "./LoadingPage";
import {config} from "../utils";

export default function Site() {

  const [site] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      await axios.get(`https://ogyh-backend-dev.herokuapp.com/api/sites`, config)
        .then(response => {
          for (const responseElement of response.data.response) {
            site.push(<div className="p-1">
              <div className="card p-3 animated fadeIn">
                <div className="card-body">
                  {responseElement.name}
                </div>
                <div className="card-footer">
                  {responseElement.location.formatted_address}
                </div>
              </div>
            </div>)
          }
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  function getSite() {
    return (
      <div className="background__blue">
        <Navbar />
        <div className="card content" style={{background: "white"}}>
          <div style={{margin: "auto"}}>
            <div className="frame p-0">
              <div className="frame__body p-0">
                <div className="row p-0 level fill-height">
                  <div className="col">
                    <div className="space" />
                    <div className="padded">
                      <h1 className="u-text-center u-font-alt">Site List</h1>
                      <div className="divider" />
                    </div>
                    {site}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space xlarge" />
      </div>
    );
  }

  return loading ? getSite() : LoadingPage();
}