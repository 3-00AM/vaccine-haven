import React from 'react';
import {BASE_URL, config} from "../utils";
import axios from "axios";

export const getAccessToken = async () => {
  await axios.post(`${BASE_URL}/login`, null, {
    headers: {
      'Authorization': 'Basic ' + process.env.REACT_APP_AUTH_DATA
    }
  }).then(r => {
    config.headers.Authorization = 'Bearer ' + r.data.access_token
  })
}