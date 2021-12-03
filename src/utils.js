import axios from "axios";

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

export const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate"
};