import React, {useEffect, useState} from 'react';
import 'cirrus-ui';
import axios from "axios";
import Navbar from "./Navbar";

export default function Site() {

  const [site, setSite] = useState([]);
  const [loading, setLoading] = useState(false);

  const config = {
    method: 'GET',
    url: 'https://ogyh-backend-dev.herokuapp.com/api/sites',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  const getSite = async () => {
    try {
      await axios(config)
        .then(response => {
          for (const responseElement of response.data.response) {
            site.push(<div className="p-3">
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
  };

  useEffect(() => {
    getSite().then(r => {});
  }, []);

  return <div className="hero fullscreen">
    <Navbar/>
    <div className="content">
      <div style={{margin: "auto"}}>
        <div className="frame p-0">
          <div className="frame__body p-0">
            <div className="row p-0 level fill-height">
              <div className="col">
                <div className="space xlarge"/>
                <div className="padded">
                  <h1 className="u-text-center u-font-alt">Site List</h1>
                  <div className="divider"/>
                </div>
                {loading ? (site) : (<div className="animated loading"/>)}
                <div className="space xlarge"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}