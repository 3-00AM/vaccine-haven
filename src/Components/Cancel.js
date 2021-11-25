import Axios from "axios";
import {useHistory} from "react-router-dom";
import {toaster} from "evergreen-ui";

function Cancel({ citizen_id }) {

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
                toaster.success("Cancellation Successful!", {
                    id: "forbidden-action",
                    description: "Now you can reserve more vaccine.",
                    duration: 5,
                    zIndex: 100
                  })
                console.log(JSON.stringify(response.data));
                history.push("/info")
            })
            .catch(function (error) {
                toaster.danger("Cancellation Failed!", {
                    id: "forbidden-action",
                    description: "There is no vaccine reservation to cancel.",
                    duration: 5,
                    zIndex: 100
                  })
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