import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {BASE_URL, fetchUser, postUser,} from "../../utils";

let stubReservationData = [
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
const urlReserveParameter = `citizen_id=${stubReservationData.citizen_id}&site_name=${stubReservationData.site_name}&vaccine_name=${stubReservationData.vaccine_name}`


const reservationUrl = `${BASE_URL}/reservation`;

const getReservationUrl = `${reservationUrl}/${stubReservationData.citizen_id}`
const postReservationUrl = `${reservationUrl}?${urlReserveParameter}`
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

describe("When successful get a particular citizen data", () => {
  it('should get reservation of that citizen back from government', async function () {
    mock.onGet(getReservationUrl).reply(200, stubReservationData);

    const result = await fetchUser(getReservationUrl)

    expect(mock.history.get[0].url).toEqual(getReservationUrl);
    expect(result.data).toEqual(stubReservationData)
  })
});

describe("When successful making reservation", () => {
  it('should get reservation information of that citizen back from government', async function () {
    let data = stubReservationData[0]
    // data.push({"feedback": "reservation success!"})
    mock.onPost(`${postReservationUrl}`).reply(200, data);
    const result = await postUser(postReservationUrl)

    expect(mock.history.post[0].url).toEqual(postReservationUrl);
    expect(result.data).toEqual(data)
  })
});