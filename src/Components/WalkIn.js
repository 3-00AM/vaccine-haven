import React, {useEffect, useState} from 'react';
import 'cirrus-ui';
import axios from "axios";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

export default function WalkIn() {

  const [site, setSite] = useState([]);
  const [youtube, setMedia] = useState(null);

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

  const yeet = () => {
    setMedia(
      <div className="media-stretch rat-4-3">
        <iframe width="" height="" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="YouTube video player" frameBorder="0" allow='autoplay'/>
      </div>)
  }

  return <div className="bg-blue-100">
    <Navbar/>
    <div className="py-10">
      {/*{youtube}*/}
      {/*<div className="p-3">*/}
      {/*  <div className="toast toast--danger animated fadeIn infinite">*/}
      {/*    <button className="btn-close" onClick={yeet}/>*/}
      {/*    <p>Error</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {site.map(site => {
        return <div className="p-3">
          <div className="card p-3">
            <div className="card-body">
              Site: {site.name}
              <Link to="#" style={{float: "right"}} className="utb utb-OLR"> More Info </Link>
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