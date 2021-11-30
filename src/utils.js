import axios from "axios";
import {getAccessToken} from "./lib/getAccessToken";

export const BASE_URL = "https://wcg-apis-test.herokuapp.com";

export const config = {
  params: ``,
  url: ``,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': ''
  }
};

export const fetchUser = async (url) => {
  getAccessToken()
  try {
    return await axios.get(`${url}`);
  } catch (e) {
    return [];
  }
};

export const postUser = async (url) => {
  getAccessToken()
  try {
    // config.params = data
    // config.url = `${BASE_URL}/registration`
    return await axios.post(`${url}`)
  } catch (e) {
    return [];
  }
}