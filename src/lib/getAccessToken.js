import React from 'react';
import {config} from "../utils";
import axios from "axios";

export const getAccessToken = async () => {
  await axios.post(`https://wcg-apis-test.herokuapp.com/login`, null, {
    headers: {
      'Authorization': 'Basic ' + process.env.REACT_APP_AUTH_DATA
    }
  }).then(r => {
    console.log(r.data.access_token);
    config.headers.Authorization = 'Bearer ' + r.data.access_token
  })
}