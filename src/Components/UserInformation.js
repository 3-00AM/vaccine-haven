import React from 'react'
import Cancel from './Cancel';
import { useState } from 'react'
import Axios from "axios";

function UserInformation({ citizen_id }) {

    const [reserveStatus, setReserveStatus] = useState(false)
    const base_url = 'https://wcg-apis.herokuapp.com';
    
    const config = {
        method: 'get',
        url: ``,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    };


    return (
        <div>
            <h1>Display user info</h1>
            <h1>{citizen_id}</h1>
            <Cancel citizen_id={citizen_id}/>
        </div>
    )
}

export default UserInformation
