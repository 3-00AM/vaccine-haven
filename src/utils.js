import axios from "axios";
import async from "async";

export const BASE_URL = "https://wcg-apis.herokuapp.com";

export let register_data = {
  citizen_id: "2222222222222",
  name: "Vichisorn",
  surname: "Wejsupakul",
  birthdate: "2000-10-26",
  occupation: "Student",
  phone_number: "0964590546",
  is_risk: "True",
  address: "TestAPI",
  vaccine_taken: "[]"
}

export let reservation_data = [
  {
    "citizen_id": "1234567890123",
    "site_name": "ABC",
    "vaccine_name": "Pfizer",
    "timestamp": "2021-11-12 00:43:15.399941",
    "queue": "2022-02-03 10:11:01",
    "checked": "True"
  },
  {
    "citizen_id": "1234567890123",
    "site_name": "ABC",
    "vaccine_name": "Pfizer",
    "timestamp": "2021-11-12 01:23:15.182224",
    "queue": "None",
    "checked": "False"
  }
]

export let urlParameter = `name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`

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