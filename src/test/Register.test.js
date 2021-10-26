import React from "react";
import {cleanup} from "@testing-library/react";
import axios from "axios";
import * as assert from "assert";

const base_url = 'https://wcg-apis.herokuapp.com/registration';

let data = {
  firstname: "Vichisorn",
  lastname: "Wejsupakul",
  citizen_id: "1101402211111",
  birthdate: "2000-10-26",
  occupation: "Student",
  address: "TestAPI"
}

let response = {}

const postRegisterUrl = `${base_url}?name=${data.firstname}&surname=${data.lastname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}`

const deleteCitizenID = `https://wcg-apis.herokuapp.com/citizen?citizen_id=${data.citizen_id}`

let config = {
  method: '',
  url: '',
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
};

async function submitRequest(response) {
  await axios(config)
    .then(function (response) {
      JSON.stringify(response.data)
    })
    .catch(function (error) {
      response = error;
    });
  return response
}

beforeEach(async () => {
  config = {
    method: 'post',
    url: postRegisterUrl
  };
  response = await submitRequest(response)
})

afterEach(async() => {
  config = {
    method: 'delete',
    url: deleteCitizenID
  }
  await submitRequest(response)
  response = ""
  cleanup()
});

it('should input and post data', function () {
  console.log(response)
});

