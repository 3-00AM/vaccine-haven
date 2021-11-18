import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {BASE_URL, fetchReservedUser, reservation_data, urlParameter} from "../../utils";

const reservation_url = `${BASE_URL}/reservation`;


let postReservationUrl = `${reservation_url}?${urlParameter}`
let mock;

beforeAll(() => {
    mock = new MockAdapter(axios);
});

afterEach(() => {
    mock.reset();
});

describe("When successful get a particular citizen data", () => {
    it('should get reservation of that citizen back from government', async function () {
        mock.onGet(`${reservation_url}/${reservation_data.citizen_id}`).reply(200, reservation_data);

        const result = await fetchReservedUser(reservation_data)

        expect(mock.history.get[0].url).toEqual(`${reservation_url}/${reservation_data.citizen_id}`);
        expect(result.data).toEqual(reservation_data)
    })
});