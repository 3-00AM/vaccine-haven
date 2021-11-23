import React, {useEffect, useState} from 'react';
import 'cirrus-ui';
import axios from "axios";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

export default function WalkIn() {

  const [site, setSite] = useState([]);

  const config = {
    method: 'GET',
    url: 'https://ogyh-backend-dev.herokuapp.com/api/sites',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        let data = []
        for (const responseElement of response.data.response) {
          data.push(responseElement);
        }
        setSite(data);
      });
    console.log(site)
  }, []);

  return <div className="bg-blue-100">
    <Navbar/>
    <div className="py-10">
      {site.map(site => {
        return <div className="p-3">
          <div className="card p-3">
            <div className="card-body">
              Site: {site.name}
              <Link to="/" style={{float: "right"}} className="utb utb-OLR"> More Info </Link>
              <div className="animated loading"> </div>
            </div>
            <div className="card-footer">
              Location: {site.location}
            </div>
          </div>
        </div>
      })}
    </div>
  </div>
}