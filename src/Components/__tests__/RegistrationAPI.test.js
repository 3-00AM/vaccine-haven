import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {BASE_URL, fetchRegisteredUser, postRegisterUser, register_data, urlParameter} from "../../utils";

const registration_url = `${BASE_URL}/registration`;

let postRegisterUrl = `${registration_url}?${urlParameter}`
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});


describe("When successful get a particular citizen data", () => {
  it('should get registered data of that citizen back from government', async function () {
    mock.onGet(`${registration_url}/${register_data.citizen_id}`).reply(200, register_data);

    const result = await fetchRegisteredUser(register_data)

    expect(mock.history.get[0].url).toEqual(`${registration_url}/${register_data.citizen_id}`);
    expect(result.data).toEqual(register_data)
  })
});

describe("When failed get a particular citizen data", () => {
  it('should not get registered data of that citizen', async function () {
    mock.onGet(`${registration_url}/${register_data.citizen_id}`).reply(404, []);

    const result = await fetchRegisteredUser(register_data)

    expect(mock.history.get[0].url).toEqual(`${registration_url}/${register_data.citizen_id}`);
    expect(result).toEqual([])
  })
})

describe("When successfully post a citizen data", () => {
  it('should get registered data of that citizen', async function () {
    mock.onPost(postRegisterUrl).reply(201, register_data);

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual(register_data)
  })
})

describe("When failed post a citizen data", () => {
  it('should not get registered data of that citizen when citizen id already exists', async function () {
    mock.onPost(postRegisterUrl).reply(200, "registration failed: this person already registered");

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: this person already registered")
  });

  it('should not get registered data of that citizen when birthdate is not archived minimum age', async function () {
    register_data.birthdate = "2018-01-01";
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: not archived minimum age");

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: not archived minimum age")
  });

  it('should not get registered data of that citizen when birthdate is invalid format', async function () {
    register_data.birthdate = "It's James birthday";
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: invalid birth date format")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: invalid birth date format")
  });

  it('should not register that citizen when a name field is missing', async function () {
    register_data.name = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a surname field is missing', async function () {
    register_data.surname = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a citizen id field is missing', async function () {
    register_data.citizen_id = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a birth date field is missing', async function () {
    register_data.birthdate = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when an occupation field is missing', async function () {
    register_data.occupation = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when an address field is missing', async function () {
    register_data.address = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when a phone number field is missing', async function () {
    register_data.phone_number = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });

  it('should not register that citizen when is_risk is missing', async function () {
    register_data.is_risk = ""
    postRegisterUrl = `${registration_url}?name=${register_data.name}&surname=${register_data.surname}&citizen_id=${register_data.citizen_id}&birth_date=${register_data.birthdate}&occupation=${register_data.occupation}&address=${register_data.address}&phone_number=${register_data.phone_number}&is_risk=${register_data.is_risk}`
    mock.onPost(postRegisterUrl).reply(200, "registration failed: missing some attribute")

    const result = await postRegisterUser(register_data)

    expect(mock.history.post[0].url).toEqual(`${postRegisterUrl}`);
    expect(result.data).toEqual("registration failed: missing some attribute")
  });
})