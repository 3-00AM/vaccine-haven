import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {BASE_URL, fetchRegisteredUser, postRegisterUser} from "../../utils";

const registration_url = `${BASE_URL}/registration`;

let data = {
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
let postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});


describe("When successful get a particular citizen data", () => {
  it('should get registered data of that citizen back from government', async function () {
    mock.onGet(`${registration_url}/${data.citizen_id}`).reply(200, data);

    const result = await fetchRegisteredUser(data)

    expect(mock.history.get[0].url).toEqual(`${registration_url}/${data.citizen_id}`);
    expect(result.data).toEqual(data)
  })
});

describe("When failed get a particular citizen data", () => {
  it('should not get registered data of that citizen', async function () {
    mock.onGet(`${registration_url}/${data.citizen_id}`).reply(404, []);

    const result = await fetchRegisteredUser(data)

    expect(mock.history.get[0].url).toEqual(`${registration_url}/${data.citizen_id}`);
    expect(result).toEqual([])
  })
})

describe("When successfully post a citizen data", () => {
  it('should get registered data of that citizen', async function () {
    mock.onPost(postRegisterUrl).reply(201, data);

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual(data)
  })
})

describe("When failed post a citizen data", () => {
  it('should not get registered data of that citizen when citizen id already exists', async function () {
    mock.onPost(postRegisterUrl).reply(200, "registration failed: this person already registered");

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: this person already registered")
  });

  it('should not get registered data of that citizen when birthdate is not archived minimum age', async function () {
    data.birthdate = "2018-01-01";
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: not archived minimum age");

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: not archived minimum age")
  });

  it('should not get registered data of that citizen when birthdate is invalid format', async function () {
    data.birthdate = "It's James birthday";
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: invalid birth date format")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: invalid birth date format")
  });

  it('should not register that citizen when a name field is missing', async function () {
    data.name = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a surname field is missing', async function () {
    data.surname = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a citizen id field is missing', async function () {
    data.citizen_id = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a birth date field is missing', async function () {
    data.birthdate = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when an occupation field is missing', async function () {
    data.occupation = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when an address field is missing', async function () {
    data.address = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a phone number field is missing', async function () {
    data.phone_number = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when is_risk is missing', async function () {
    data.is_risk = ""
    postRegisterUrl = `${registration_url}?name=${data.name}&surname=${data.surname}&citizen_id=${data.citizen_id}&birth_date=${data.birthdate}&occupation=${data.occupation}&address=${data.address}&phone_number=${data.phone_number}&is_risk=${data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });
})