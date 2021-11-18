import axios from "axios";
import async from "async";

export const BASE_URL = "https://wcg-apis.herokuapp.com";

export const config = {
  params: ``,
  url: ``,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
};

export const fetchUser = async (url) => {
  try {
    return await axios.get(`${url}`);
  } catch (e) {
    return [];
  }
};

export const postUser = async (url) => {
  try {
    // config.params = data
    // config.url = `${BASE_URL}/registration`
    return await axios.post(`${url}`)
  } catch (e) {
    return [];
  }
}