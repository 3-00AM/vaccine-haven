import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {BASE_URL, fetchUser, postUser,} from "../../utils";

let stubRegistrationData = {
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

const urlRegisterParameter = `name=${stubRegistrationData.name}&surname=${stubRegistrationData.surname}&citizen_id=${stubRegistrationData.citizen_id}&birth_date=${stubRegistrationData.birthdate}&occupation=${stubRegistrationData.occupation}&address=${stubRegistrationData.address}&phone_number=${stubRegistrationData.phone_number}&is_risk=${stubRegistrationData.is_risk}`
const registrationUrl = `${BASE_URL}/registration`;
const getRegistrationUrl = `${registrationUrl}/${stubRegistrationData.citizen_id}`

let postRegistrationUrl = `${registrationUrl}?${urlRegisterParameter}`
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});


describe("When successful get a particular citizen data", () => {
  it('should get registered data of that citizen back from government', async function () {
    mock.onGet(`${getRegistrationUrl}`).reply(200, stubRegistrationData);

    const result = await fetchUser(getRegistrationUrl)

    expect(mock.history.get[0].url).toEqual(getRegistrationUrl);
    expect(result.data).toEqual(stubRegistrationData)
  })
});

describe("When failed get a particular citizen data", () => {
  it('should not get registered data of that citizen', async function () {
    mock.onGet(`${getRegistrationUrl}`).reply(404, []);

    const result = await fetchUser(getRegistrationUrl)

    expect(mock.history.get[0].url).toEqual(getRegistrationUrl);
    expect(result).toEqual([])
  })
})

describe("When successfully post a citizen data", () => {
  it('should get registered data of that citizen', async function () {
    mock.onPost(postRegistrationUrl).reply(201, stubRegistrationData);

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual(stubRegistrationData)
  })
})

describe("When failed post a citizen data", () => {
  it('should not get registered data of that citizen when citizen id already exists', async function () {
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: this person already registered");

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: this person already registered")
  });

  it('should not get registered data of that citizen when birthdate is not archived minimum age', async function () {
    stubRegistrationData.birthdate = "2018-01-01";
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: not archived minimum age");

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: not archived minimum age")
  });

  it('should not get registered data of that citizen when birthdate is invalid format', async function () {
    stubRegistrationData.birthdate = "It's James birthday";
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: invalid birth date format")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: invalid birth date format")
  });

  it('should not register that citizen when a name field is missing', async function () {
    stubRegistrationData.name = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a surname field is missing', async function () {
    stubRegistrationData.surname = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a citizen id field is missing', async function () {
    stubRegistrationData.citizen_id = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a birth date field is missing', async function () {
    stubRegistrationData.birthdate = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when an occupation field is missing', async function () {
    stubRegistrationData.occupation = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when an address field is missing', async function () {
    stubRegistrationData.address = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a phone number field is missing', async function () {
    stubRegistrationData.phone_number = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when is_risk is missing', async function () {
    stubRegistrationData.is_risk = ""
    mock.onPost(postRegistrationUrl).reply(200, "registration failed: missing some attribute")

    const result = await postUser(postRegistrationUrl)

    expect(mock.history.post[0].url).toEqual(`${postRegistrationUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });
})