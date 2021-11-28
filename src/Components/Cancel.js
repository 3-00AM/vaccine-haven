import axios from "axios";
import {useHistory} from "react-router-dom";
import {BASE_URL, config} from "../utils";

function Cancel({citizen_id}) {
  const history = useHistory();

  const onClick = async () => {
    // change this to send json
    config.url =
    await axios.delete(`${BASE_URL}/reservation/${citizen_id}`, config)
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
      <button id={`cancel__btn`} className="btn-danger" type="submit" onClick={onClick}>Cancel</button>
    </div>
  )
}

export default Cancel