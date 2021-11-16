import axios from "axios";
import async from "async";

export const BASE_URL = "https://wcg-apis.herokuapp.com";

export const config = {
  params: {},
  url: ``,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
};

export const fetchRegisteredUser = async () => {
  try {
    return await axios.get(`${BASE_URL}/registration/1111111111111`);
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