import React, {useEffect, useState} from 'react';
import 'cirrus-ui';
import axios from "axios";

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

  return <div>
    {site.map(site => {
      return <div>
        <p>SiteName: {site.name}</p>
        <p>Location: {site.location}</p>
      </div>
    })}
  </div>
}