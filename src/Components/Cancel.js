import Axios from "axios";
import {useHistory} from "react-router-dom";

function Cancel({citizen_id}) {

  const base_url = 'https://wcg-apis.herokuapp.com';
  const config = {
    method: 'DELETE',
    url: ``,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };
  const history = useHistory();

  const onClick = async () => {
    // change this to send json
    config.url = `${base_url}/reservation/${citizen_id}`
    await Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.push("/info")
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div>
      <button className="btn-danger" type="submit" onClick={onClick}>Cancel</button>
    </div>
  )
}

export default Cancel