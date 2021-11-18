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

export const fetchRegisteredUser = async (data) => {
  try {
    return await axios.get(`${BASE_URL}/registration/${data.citizen_id}`);
  } catch (e) {
    return [];
  }
};

export const postRegisterUser = async (data) => {
  try {
    // config.params = data
    // config.url = `${BASE_URL}/registration`
    return await axios.post(`${BASE_URL}/registration?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`)
  } catch (e) {
    return [];
  }
}

export const fetchReservedUser = async (data) => {
  try {
    return await axios.get(`${BASE_URL}/reservation/${data.citizen_id}`)
  } catch (e) {
    return [];
  }
}

export const postReserveUser = async (data) => {
  try {
    return await axios.post(`${BASE_URL}/reservation?citizen_id=${data.citizen_id}&site_name=${data.site_name}&vaccine_name=${data.vaccine_name}`)
  } catch (e) {
    return [];
  }
}